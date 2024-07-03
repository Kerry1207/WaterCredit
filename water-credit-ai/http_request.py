import os

import requests
from dotenv import load_dotenv


class HttpRequest:

    def __init__(self):
        load_dotenv()
        self.hf_cookie = os.getenv("HF_CHAT")
        self.headers = {
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
            'Origin': 'https://huggingface.co',
            'Cookie': ('hf-chat=' + str(self.hf_cookie))
        }
        self.headers_chat = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
            'Origin': 'https://huggingface.co',
            'Cookie': ('hf-chat=' + str(self.hf_cookie))
        }

    def delete(self, url):
        response = requests.delete(url=url, headers=self.headers)
        if response.status_code == 200:
            print("Delete done")
        else:
            print("Error: " + str(response.status_code) + "\nReason: " + response.reason)

    def post_chat(self, url, payload):
        response = requests.request("POST", url, headers=self.headers_chat, files=payload)
        if response.status_code == 200:
            return response.text
        else:
            print("Error: " + str(response.status_code) + "\nReason: " + response.reason)

    def post(self, url, params):
        response = requests.post(url=url, headers=self.headers, data=params)
        if response.status_code == 200:
            return response.json()
        else:
            print("Error: " + str(response.status_code) + "\nReason: " + response.reason)

    def get(self, url):
        response = requests.get(url, headers=self.headers)
        if response.status_code == 200:
            return response.json()
        else:
            print("Error: " + str(response.status_code))
