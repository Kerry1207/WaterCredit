import os

from dotenv import load_dotenv
from solana.rpc.api import Client, Pubkey, Keypair
from solana.transaction import Transaction
from spl.token.client import Token
from spl.token.constants import TOKEN_PROGRAM_ID
from spl.token.instructions import get_associated_token_address, create_associated_token_account, mint_to, MintToParams


class TokenUtil:
    
    def __init__(self, recipient_pub_key):
        load_dotenv()
        seed_array = self.retrieve_seed()
        seed_bytes = bytes(seed_array)
        self.keypair = Keypair.from_seed(seed_bytes[:32])
        self.token_mint_address = os.getenv("MINT_TOKEN_ADDRESS")
        self.recipient_pub_key = recipient_pub_key
        self.client = Client("https://api.devnet.solana.com")
        self.pub_key_token_mint_address = Pubkey.from_string(self.token_mint_address)

    def retrieve_seed(self):
        try:
            seed_file = open("seed.txt", "r+")
            seed_string = seed_file.read().strip().replace("[", "").replace("]", "")
            seed_array = []
            for num in seed_string.split(','):
                seed_array.append(int(num))
            seed_file.close()
        except ValueError:
            raise ValueError("Error to convert seed from file")
        except FileNotFoundError:
            raise FileNotFoundError("File 'seed' not found")
        return seed_array

    def create_associated_token_account(self, address_recipient):
        try:
            pub_key_recipient = Pubkey.from_string(address_recipient)
            associated_token_account_address = get_associated_token_address(pub_key_recipient, self.pub_key_token_mint_address)
            account_info = self.client.get_account_info(pubkey=associated_token_account_address)
            if account_info.value is None:
                instruction = create_associated_token_account(
                    payer=self.keypair.pubkey(),
                    owner=pub_key_recipient,
                    mint=self.pub_key_token_mint_address
                )
                tx = Transaction()
                tx.add(instruction)
                tx_resp = self.client.send_transaction(tx, self.keypair)
                print('Create associated token account tx: ', tx_resp.value)
            return True
        except Exception as e:
            print(e.args[0])
        return False

    def mint_token(self, amount):
        try:
            pub_key_recipient = Pubkey.from_string(self.recipient_pub_key)
            associated_token_account_address = get_associated_token_address(pub_key_recipient, self.pub_key_token_mint_address)
            print("Associated token account address: ", associated_token_account_address)
            token = Token(conn=self.client, pubkey=self.pub_key_token_mint_address, program_id=TOKEN_PROGRAM_ID, payer=self.keypair)
            amount_calculated = int(amount * (10 ** 6))
            print("Amount calculated: " + str(amount_calculated))
            tx_resp = token.mint_to(
                dest=associated_token_account_address,
                mint_authority=self.keypair,
                amount=amount_calculated
            )
            print("Mint to transaction: ", tx_resp.value)
            return True
        except Exception as e:
            print(e.args[0])
        return False
