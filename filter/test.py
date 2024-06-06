from Filchatter import Filchatter

client = Filchatter()
client.set_api_key("4336a62ab2069cee31110575ac69c0dc")
chat = "fuck yourself"
response = client.send_json_request(chat, option = 1)
print(response.json())