#查看个人参与项目详情列表
# coding=utf8
import sys

defaultencoding = 'utf-8'

from flask import Flask, render_template, request, json,Blueprint
import pymysql.cursors
import json

#导入模块

check_item = Blueprint("check_item", __name__)
@check_item.route('/user/check_item',methods=['POST'])
def check_item():
    user_key = str(json.loads(request.values.get("user_key")))#获取参数
    
    conn = pymysql.Connect(
        host='localhost',
        port=3306,
        user='woider',
        passwd='3243',
        db='python',
        charset='utf8'
    )#连接数据库
    # 获取游标
    cursor = conn.cursor()
    sql = "select password form user where user_id = %s" % (user_id)
    cursor.execute(sql)
    pw = cursor.fetchone()
    cursor.close()
    conn.close()#关闭连接（方便其他接口之后的开启）

    if pw==password:
        s = 1
        res = {}
        res['code'] = s
        return json.dumps(res, ensure_ascii=False)
    else:
        s = 0
        M="密码错误"
        res = {}
        res['code'] = s
        res['msg'] = M
        return json.dumps(res, ensure_ascii=False)

    return json.dumps(res.decode('utf8'))