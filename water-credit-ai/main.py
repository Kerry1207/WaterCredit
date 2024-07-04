import uvicorn
from bson import ObjectId
from fastapi import FastAPI
from pydantic import BaseModel

from ai_utils import AIUtils
from mongo_utils import MongoUtils
from token_util import TokenUtil


class MintTokenModel(BaseModel):
    address: str
    amount: float
    id_bill_1: str
    id_bill_2: str


class CreateAssociatedTokenAccount(BaseModel):
    address: str


class ExtractDataModel(BaseModel):
    id: str


app = FastAPI()


@app.post("/mintToken")
async def mint_token(mint_token_model: MintTokenModel):
    address_recipient = mint_token_model.address
    amount = mint_token_model.amount
    id_first_bill = mint_token_model.id_bill_1
    id_second_bill = mint_token_model.id_bill_2
    mongo_util = MongoUtils()
    tu = TokenUtil(address_recipient)
    result = tu.mint_token(amount)
    if not result[0]:
        return {"status": "error"}
    update_values = {"$set": {"status": 1}}
    mongo_util.update(query={"_id": ObjectId(id_first_bill)}, update_values=update_values)
    print("Update status of first bill: " + str(id_first_bill))
    mongo_util.update(query={"_id": ObjectId(id_second_bill)}, update_values=update_values)
    print("Update status of second bill: " + str(id_second_bill))
    return {"status": "success", "tx": str(result[1])}


@app.post("/createAssociatedTokenAccount")
async def create_associated_token_account(create_associated_token_model: CreateAssociatedTokenAccount):
    address_recipient = create_associated_token_model.address
    tu = TokenUtil(address_recipient)
    result = tu.create_associated_token_account(address_recipient)
    if not result:
        return {"status": "error"}
    return {"status": "success"}


@app.post("/extractData")
def extract_data(extract_data_model: ExtractDataModel):
    id_element = extract_data_model.id
    ai_utils = AIUtils()
    result = ai_utils.extract_data_using_ai(id_element)
    if not result:
        return {"status": "error"}
    return {"status": "success"}


if __name__ == '__main__':
    uvicorn.run(app, host="0.0.0.0", port=8000)
