# Website

This is a prototype website made to work using flask. Main focus was the implementation of the chatbot interface.

The torch framework takes up too much space to publish for free anywhere, so the published version chatbot does not use machine learning. To try the flask version, simplty clone the repository and call the flask app as:

```
python3 app.py true
```

Then open the index.html file in a browser of your choice.
NB, the code uses the nltk.tokenize.punkt module, which you should donwload manually if you want to run the actual chatbot. So simply open a python terminal and download the module before calling app.py.

```
python3
nltk.download('punkt')
```
