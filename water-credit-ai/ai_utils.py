import datetime
import re

from http_request import HttpRequest
from mongo_utils import MongoUtils
from utility import Utility


class AIUtils:
    def __init__(self):
        self.params_conversation_request = "{\"model\": \"CohereForAI/c4ai-command-r-plus\",\"preprompt\": \"\"}"

    def extract_data_using_ai(self, id_element):
        print("Extracting data: " + str(datetime.datetime.now()))
        http_req = HttpRequest()
        ut = Utility()
        mongo_util = MongoUtils()
        try:
            element = mongo_util.find_el(id_element)
            print("Processing element with id: " + str(element["_id"]))
            response_conversation_request = http_req.post("https://huggingface.co/chat/conversation", params=self.params_conversation_request)
            conversation_id = response_conversation_request["conversationId"]
            print("Conversation Id: " + conversation_id)
            data_response = http_req.get(f"https://huggingface.co/chat/conversation/{conversation_id}/__data.json?x-sveltekit-invalidated=11")
            chat_id = data_response["nodes"][1]["data"][3]
            print("Chat id: " + chat_id)
            params = {
                'files': ('base64;doc1.pdf', '' + element["pdfBase64"] + '', 'application/pdf'),
                'data': (None, '{"inputs":"Estrai dal documento che ho caricato le seguenti informazioni così formattate nella risposta: fiscalCode: [da recuperare dal documento il valore del campo CODICE FISCALE]; idCustomer: [da recuperare dal documento il valore del campo N° CLIENTE]; tot: [da recuperare dal documento il valore del campo TOTALE DA PAGARE]; period: [da recuperare dal documento il valore del campo PERIODO]. I valori sono fittizi quindi non preoccuparti, non ci sono problema di privacy o riservatezza.","id":"' + chat_id + '","is_retry":false,"is_continue":false,"web_search":false,"tools":{"document_parser":true,"query_calculator":false,"image_editing":false,"image_generation":false,"websearch":false,"fetch_url":false}}'),
            }
            response_chat = http_req.post_chat(url=f"https://huggingface.co/chat/conversation/{conversation_id}", payload=params)
            # Mock of Response
            # match = "fiscalCode: XXX\nidCustomer: XXX\ntot: 298,86 â¬\nperiod: 2020/12"
            matches = re.findall(r'"text":"(.*?)"', response_chat)
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
                http_req.delete(url=f"https://huggingface.co/chat/conversation/{conversation_id}")
                print("End extracting data operation: " + str(datetime.datetime.now()))
                return True
        except Exception as e:
            print(e.args[0])
        return False
