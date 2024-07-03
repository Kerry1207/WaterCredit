import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel

from ai_utils import AIUtils
from token_util import TokenUtil


class MintTokenModel(BaseModel):
    address: str
    amount: float


class CreateAssociatedTokenAccount(BaseModel):
    address: str


class ExtractDataModel(BaseModel):
    id: str


app = FastAPI()


@app.post("/mintToken")
async def mint_token(mint_token_model: MintTokenModel):
    address_recipient = mint_token_model.address
    amount = mint_token_model.amount
    tu = TokenUtil(address_recipient)
    result = tu.mint_token(amount)
    if not result:
        return {"status": "error"}
    return {"status": "success"}


@app.post("/createAssociatedTokenAccount")
async def mint_token(create_associated_token_model: CreateAssociatedTokenAccount):
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
