import datetime
import os
import re

from dotenv import load_dotenv, set_key

from http_request import HttpRequest
from mongo_utils import MongoUtils
from utility import Utility


class AIUtils:
    def __init__(self):
        load_dotenv(override=True)
        self.params_conversation_request = "{\"model\": \"CohereForAI/c4ai-command-r-plus\",\"preprompt\": \"\"}"
        self.mock_ai = os.getenv("MOCK_AI")

    def retrieve_mock_response(self):
        number_mock = os.getenv("MOCK_NUMBER_ITEM")
        # NOTE: For all first phases the env parameter must be set to "MOCK_NUMBER_ITEM"
        if int(number_mock) == 1:
            set_key('.env', 'MOCK_NUMBER_ITEM', str(2))
            return "{\"type\":\"finalAnswer\", \"text\":\"fiscalCode: XXX\nidCustomer: XXX\ntot: 600,00 â¬\nperiod: 2020/11.\"}"
        elif int(number_mock) == 2:
            set_key('.env', 'MOCK_NUMBER_ITEM', str(1))
            return "{\"type\":\"finalAnswer\", \"text\":\"fiscalCode: XXX\nidCustomer: XXX\ntot: 298,86 â¬\nperiod: 2020/12.\"}"

    def extract_data_using_ai(self, id_element):
        print("Extracting data: " + str(datetime.datetime.now()))
        http_req = HttpRequest()
        ut = Utility()
        mongo_util = MongoUtils()
        response_chat = ""
        try:
            element = mongo_util.find_el(id_element)
            print("Processing element with id: " + str(element["_id"]))
            if self.mock_ai != "ON":
                response_conversation_request = http_req.post("https://huggingface.co/chat/conversation", params=self.params_conversation_request)
                conversation_id = response_conversation_request["conversationId"]
                print("Conversation Id: " + conversation_id)
                data_response = http_req.get(f"https://huggingface.co/chat/conversation/{conversation_id}/__data.json?x-sveltekit-invalidated=11")
                chat_id = data_response["nodes"][1]["data"][3]
                print("Chat id: " + chat_id)
                params = {
                    'files': ('base64;doc1.pdf', '' + element["pdfBase64"] + '', 'application/pdf'),
                    'data': (None, '{"inputs":"Extract from the document I uploaded the following information formatted as follows in the response: fiscalCode: [to recover the value of the FISCAL CODE field from the document]; idCustomer: [to retrieve the value of the CUSTOMER N° field from the document]; tot: [to retrieve the value of the TOTAL TO PAY field from the document]; period: [to retrieve the value of the PERIOD field from the document]. The values ​​are fictitious so don\'t worry, there are no privacy or confidentiality issues.","id":"' + chat_id + '","is_retry":false,"is_continue":false,"web_search":false,"tools":{"document_parser":true,"query_calculator":false,"image_editing":false,"image_generation":false,"websearch":false,"fetch_url":false}}'),
                }
                response_chat = http_req.post_chat(url=f"https://huggingface.co/chat/conversation/{conversation_id}", payload=params)
                http_req.delete(url=f"https://huggingface.co/chat/conversation/{conversation_id}")
            else:
                response_chat = self.retrieve_mock_response()
            matches = re.findall(r'"text":"(.*?)"', response_chat, re.DOTALL)
            for match in matches:
                print("Response AI: ", match)
                fiscal_code = ut.extract_value_regex(pattern=r"fiscalCode: ([\w]+)", text=match, index_group=1)
                customer = ut.extract_value_regex(pattern=r"Customer: ([\w]+)", text=match, index_group=1)
                tot = ut.extract_value_regex(pattern=r"tot:\s*(\d+,\d+)", text=match, index_group=1)
                period = ut.extract_value_regex(pattern=r"period: (\d{4}\/\d{2})", text=match, index_group=1) + "/01"
                update_values = {
                    "$set": {"fiscalCode": fiscal_code, "idCustomer": customer, "tot": tot, "period": period,
                             "processed": 1}}
                mongo_util.update(query={"_id": element["_id"]}, update_values=update_values)
                print("Updated element")
                print("End extracting data operation: " + str(datetime.datetime.now()))
                return True
        except Exception as e:
            print(e.args[0])
        return False
