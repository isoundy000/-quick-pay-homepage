#### 接口分2中.请选择自己对应的方式

##### 1 : 活码,xposed版本,不需要上传二维码的. 接口地址: https://xpapi.ukafu.com/xppayapi
##### 2 : 死码,监控通知的版本,必须手动上传二维码. 接口地址: https://pxpay.ukafu.com/pxpayapi

## 接口参数

<table class="table table-bordered">
    <thead>
    <tr class='api-doc-table'>
        <th>参数名</th>
        <th>含义</th>
        <th>类型</th>
        <th>选填/必填</th>
        <th>说明</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <th scope="row">merchantid</th>
        <td>商户ID</td>
        <td>string</td>
        <td>必填</td>
        <td>商户唯一标识，在APP中可以差看商户密钥</td>
    </tr>
    <tr>
        <th scope="row">amount</th>
        <td>金额</td>
        <td>float</td>
        <td>必填</td>    
        <td>付款的金额，单位：元，精确到小数点后两位</td>
    </tr>
    <tr>
        <th scope="row">paytype</th>
        <td>渠道</td>
        <td>string</td>
        <td>必填</td>    
        <td>订单金额</td>
    </tr>
    <tr>
        <th scope="row">notify_url</th>
        <td>通知接口地址</td>
        <td>string</td>
        <td>必填</td>    
        <td>用户支付成功后，ukafu会发送通知信数据到此链接.请确保此链接能被外网访问</td>
    </tr>
    <tr>
        <th scope="row">return_url</th>
        <td>跳转地址</td>
        <td>string</td>
        <td>必填</td>
        <td>用户支付成功后用户浏览器自动跳转到这个网址</td>
    </tr>
    <tr>
        <th scope="row">orderid</th>
        <td>商户订单号</td>
        <td>string</td>
        <td>必填</td>
        <td>您自己的订单号，确保唯一性</td>
    </tr>
    <tr>
        <th scope="row">client_ip</th>
        <td>用户IP</td>
        <td>string</td>
        <td>必填</td>
        <td>用户请求的IP.注意是用户IP.不是服务器IP</td>
    </tr>
    <tr>
        <th scope="row">sign</th>
        <td>签名</td>
        <td>string</td>
        <td>必填</td>
        <td>由签名算法生成的签名</td>
    </tr>
    <tr>
        <th scope="row">ext</th>
        <td>拓展字段</td>
        <td>string</td>
        <td>选填</td>
        <td>此字段可以用来放用户id,等信息.原样返回</td>
    </tr>
    </tbody>
</table>




## 返回值


<table class="table table-bordered">
    <thead>
    <tr class='api-doc-table'>
        <th>参数名</th>
        <th>含义</th>
        <th>类型</th>
        <th>选填/必填</th>
        <th>说明</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <th scope="row">orderid</th>
        <td>系统订单流水号</td>
        <td>string</td>
        <td>必填</td>
        <td> 订单ID,如果自己没有支付页面.可以使用系统提供的支付页面.将此参数带入即可,https://pxpay.ukafu.com/qr/pay.html? orderid=xx</td>
    </tr>
    <tr>
        <th scope="row">paytype</th>
        <td>ALIPAY/WXPAY</td>
        <td>string</td>
        <td>必填</td>
        <td>支付方式.支付宝/微信</td>
    </tr>
    <tr>
        <th scope="row">money</th>
        <td>订单金额</td>
        <td>string</td>
        <td>必填</td>
        <td>订单金额</td>
    </tr>
    <tr>
        <th scope="row">remark</th>
        <td>订单备注</td>
        <td>string</td>
        <td>选填</td>
        <td>如果有备注,就存在.如果非xposed,是没有备注的</td>
    </tr>
    </tbody>
</table>


## 返回值如何处理?
返回值是个json,解析之后如果给用户展示支付页面?
- 1.快速使用,直接跳转到我们提供的网址:
  https://pxpay.ukafu.com/qr/pay.html?orderid=xxxxxxxxxxxxxxxx
xxxx就是返回值的orderid

- 2.利用官网提供的支付页面源码.自己架设一个支付页面:
https://gitee.com/sipengcode/quick-pay

- 3.(不推荐) 自己解析二维码,根据支付宝/微信/手机/pc四个环境提示不同的支付信息,利用服务器或者js生成二维码图片.
    ##### 支付宝:
    -  a)PC:显示二维码图,用户用手机扫一扫
    - b)手机:自动打开二维码的链接,会拉起支付宝到支付页
    ##### 微信:
    - a)PC:显示二维码,用户用手机扫;
    - b)手机:是否在微信里?
    在微信,则提示玩家识别图中二维码,
    在浏览器,提示玩家保存二维码到相册,然后再打开微信.识别相册中的二维码.

## 回调参数

<table class="table table-bordered">
    <thead>
    <tr class='api-doc-table'>
        <th>参数名</th>
        <th>含义</th>
        <th>类型</th>
        <th>选填/必填</th>
        <th>说明</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <th scope="row">orderid</th>
        <td>系统订单ID</td>
        <td>string</td>
        <td>必填</td>
        <td> 系统产生的流水id</td>
    </tr>
    <tr>
        <th scope="row">out_order_id</th>
        <td>商户订单ID</td>
        <td>string</td>
        <td>必填</td>
        <td>商户传过来的订单ID</td>
    </tr>
    <tr>
        <th scope="row">money</th>
        <td>订单交易金额</td>
        <td>string</td>
        <td>必填</td>
        <td>本次交易的金额</td>
    </tr>
    <tr>
        <th scope="row">rndstr</th>
        <td>随机字符串</td>
        <td>string</td>
        <td>必填</td>
        <td>随机字符串</td>
    </tr>
    <tr>
        <th scope="row">pay_type</th>
        <td>支付方式</td>
        <td>string</td>
        <td>必填</td>
        <td>支付方式,ALIPAY/WXPAY 两种</td>
    </tr>
     <tr>
        <th scope="row">sign</th>
        <td>签名</td>
        <td>string</td>
        <td>必填</td>
        <td>签名验证</td>
    </tr>
    </tbody>
</table>



## 回调返回值

#####  必须是大写的SUCCESS，如果不是这个返回字符串,都表示不成功.系统会在1,5,15,30,60分钟后继续回调


## 签名算法

<h5 style='line-height: 25px;'>
将发送服务器的所有参数 按字母正序排序(A-B-C-D 顺序).去掉空值. 按照 key1+value1+key2+value2+商户密钥.将字符串链接.注意+号只是表示连接字符的意思.真实不存在. 例如:merchantid=17700212,money=100.00,密钥为CaqbIGpvP44q9TgZy3KitkYKxDnrnWvF拼接字符换为: merchantid17700212money100.00CaqbIGpvP44q9TgZy3KitkYKxDnrnWvF然后md5加密.得到字串,小写
</h5>  

## 示例:
- 商户ID: 17889023
- 商户密钥: ace679b5efe7f62872a976c7b43069ae
此商户ID和密钥仅供签名参照.
- "merchantid": 17889023,
- "orderid": 1540896744,
- "amount": 10,
- "paytype": "ALIPAY",
- "client_ip": "127.0.0.1"
#### md5拼接字符串: 
amount10client_ip127.0.0.1merchantid17889023orderid1540896457paytypeALIPAYace679b5efe7f62872a976c7b43069ae

#### 请求链接:
https://xpapi.ukafu.com/xppayapi?merchantid=17889023&orderid=1540896121&amount=10&paytype=ALIPAY&client_ip=127.0.0.1&sign=00af60c769b0724c279992ac3a54a0ec

签名: 00af60c769b0724c279992ac3a54a0ec