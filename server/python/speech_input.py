# Sources: https://realpython.com/python-speech-recognition/, https://pypi.org/project/SpeechRecognition/2.1.3/
# Note: SpeechRecognition contains a default API key for the Google Web Speech API, but
# we are limited to 50 requests per day with this key
import speech_recognition as sr
import time
import sys

languageArg = sys.argv[1]

def callback(recognizer, audio):
    # Try to recognize speech input, otherwise send back a relevant error
    try:
        print(recognizer.recognize_google(audio, language=languageArg))
    except sr.RequestError:
        # API was unreachable/unresponsive
        print('API unavailable')
    except sr.UnknownValueError:
        # Speech couldn't be transcribed
        print('Unable to recognize speech')

def main():
    recognizer = sr.Recognizer()
    microphone = sr.Microphone()

    # with microphone as source:
    #     recognizer.adjust_for_ambient_noise(source, duration=0.5)

    stop_listening = recognizer.listen_in_background(microphone, callback)

    # TODO: update this so that it sleeps until sigint sent
    for _ in range(100): time.sleep(0.1)

    stop_listening(wait_for_stop=False)

main()
