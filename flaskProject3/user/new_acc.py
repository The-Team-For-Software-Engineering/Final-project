# coding=utf8
import sys
from imp import reload

defaultencoding = 'utf-8'
if sys.getdefaultencoding() != defaultencoding:
    reload(sys)
    sys.setdefaultencoding(defaultencoding)
from flask import Flask, render_template, request, json,Blueprint
import pymysql.cursors


#导入模块

New_acc = Blueprint("new_acc", __name__)
@New_acc.route('/user/new_acc')
def new_acc():
    return ("hello ")