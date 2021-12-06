# coding=utf8
import sys
from imp import reload

from wsgiref.simple_server import WSGIServer

from user import login, new_acc
from user.login import Login
from user.new_acc import New_acc

defaultencoding = 'utf-8'
if sys.getdefaultencoding() != defaultencoding:
    reload(sys)
    sys.setdefaultencoding(defaultencoding)
from flask import Flask, render_template, request, json,Blueprint
import pymysql.cursors


app = Flask(__name__)
# 注册蓝图
app.register_blueprint(Login)
app.register_blueprint(New_acc)


@app.route('/')
def index():
    return 'Hello World!'

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)
