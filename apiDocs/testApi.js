'use strict';
module.exports = {
    "host": "http://127.0.0.1:3001",
    "apis": {
        "user": {
            "name": "用户示例",
            "uri": "/test/user/{uid}",
            "method": "get",
            "header": {
                "appId": {
                    "_type": "Number",
                    "_length": 8
                }
            },
            "query": {
                "time": {
                    "_type": "Number",
                    "_length": 10
                }
            },
            "body": {},
            "return": {
                "code": {
                    "_type": "Number",
                    "_assert": 200
                },
                "data": {
                    "uid": {
                        "_type": "Number",
                        "_length": 10,
                        "_to": "temp_uid",
                        "_choices": "3,5,7"
                    },
                    "profile": {
                        "tel": {
                            "_type": "Number",
                            "_length": "11"
                        },
                        "email": {
                            "_type": "Email",
                            "_length": 20
                        }
                    }
                },
                "msg": {
                    "_type": "String"
                }
            }
        },
        "order": {
            "name": "订单示例",
            "uri": "/test/order",
            "method": "get",
            "header": {},
            "query": {},
            "body": {},
            "return": {
                "code": {
                    "_type": "Number",
                    "_assert": 200
                },
                "data": {
                    "_type": "Array"
                },
                "msg": {
                    "_type": "String"
                }
            }
        },
        "test": {
            "name": "其他示例",
            "uri": "/test/lalala",
            "method": "get",
            "header": {
                "appId": {
                    "_type": "Number",
                    "_length": "8",
                    "_choices": "1000,1001,1009"
                }
            },
            "query": {
                "time": {
                    "_type": "String",
                    "_length": "11",
                    "_required": "false"
                }
            },
            "body": {
                "content": {
                    "tel": {
                        "_type": "Number",
                        "_required": "false"
                    },
                    "email": {
                        "_type": "Email",
                        "_required": "false"
                    }
                }
            },
            "return": {
                "code": {
                    "_type": "Number",
                    "_assert": 200
                },
                "data": {
                    "tel": {
                        "value": {
                            "_type": "Number",
                            "_assert": 110
                        },
                        "note": {
                            "_type": "String",
                            "_assert": "home"
                        }
                    },
                    "email": {
                        "_type": "Email"
                    },
                    "level": {
                        "_type": "Number",
                        "_length": "2",
                        "_choices": "10,11,12"
                    }
                }
            }
        }
    }
};
