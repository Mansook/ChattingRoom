import requests
import sys
import configparser
import random
class Filchatter:
    config = configparser.ConfigParser()
    config.read('config.ini')
    ip_address = config['app']['ip_address']
    #url="http://localhost:4444"
    url = "http://"+ip_address+":4440"

    def __init__(self, api_key= None):
        self.session = requests. Session()
        self.set_api_key(api_key)
        
    def set_api_key(self, key):
        self.api_key = key

    def get_api_key(self, name):
        target_url = self.url + "/api/generate_key_post"
        response = self.session.post(target_url, json={'name': name})
        return response
        
    # JSON 데이터를 보내는 POST 요청
    def send_json_request(self, chat, option = 1):
        target_url = self.url +"/api/receive_json"
        if self.api_key == None:
            print("You should set api key with set_api_key() method.")
            return
        elif chat == None:
            print("Invalid request.")
            return
        # 서버의 IP 주소와 포트

        data = {"chat": chat, "api_key": self.api_key, "option": 0}
        response = self.session.post(target_url, json=data)
        return response
    
#=========================================== main =================================================

if __name__ == "__main__":
    test_list=["Fuck your self", "Shut the fuck up bitch", "Son of bitch", "Fuck off", "I'm gonna kill you all", "Get this assholes in the closet", "Fuck the cops", "Get your ass in here", "Did you see that shit?", "This guy is dick",
               "Stick to the fuckin plan", "Where the fuck's the chopper", "Fuck you. Fuck you. Fuck you. Fuck you", "Die you cocksuckers", "Fucking stay back I'm gonna kill you all",
               "He sits on his ass all day. Smoking dope and jerking off while he plays fucking game", "Right up here homie. I'm 'bout to go nice and slow for yo' bitch ass", "Go lose some weight with your fat ass", "Shit", "I'm schoolin' yo ass",
                "Explain that shit on my ass"]

    log = {}
    filtering = Filchatter()
    #api_key = filtering.get_api_key("name").json().get("api_key")
    #print(api_key)
    filtering.set_api_key("4336a62ab2069cee31110575ac69c0dc")
    try:
        while 1:
            #for i in range(30):
            for i in test_list:
                #chat = str(i)
                chat = str(random.randint(1,200))
                #chat = i

                response=filtering.send_json_request(chat, option = 1)
                print(chat, end="   ")
                print(response.json()["result"])
    except:
        pass