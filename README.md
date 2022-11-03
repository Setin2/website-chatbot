# Instructions

This is a prototype website made to work using flask. Main focus was the implementation of the chatbot interface. The torch framework takes up too much space to publish for free anywhere, so the published version chatbot does not actually work.

To try the flask version (and the chatbot), you must have Docker installed on your machine and follow these steps once you clone the repository:

1. First create a docker image of the app (while inside the main folder)
```
docker image build -t name_of_your_image .
```
2. Then run the image using this command
```
docker run -p 5000:5000 -d name_of_your_image
```
3. Lastly, open the flask app by opening one of these links in a browser of your choice
```
https://127.0.0.1:5000
http://localhost:5000
```
