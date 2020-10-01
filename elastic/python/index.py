import json
from elasticsearch import Elasticsearch


def connect_elasticsearch():
    _es = Elasticsearch(['http://localhost:9200'])
    if _es.ping():
        print('Yay, Elasticsearch connect')
    else:
        print('Awww it could not connect!')
    return _es


def create_index(es_object, index_name='jeopardy'):
    created = False
    settings = {
        "settings": {
            "analysis": {
                "analyzer": {
                    "id_analyzer": {
                        "type": "custom",
                        "tokenizer": "whitespace",
                        "filter": [
                            "word_delimeter",
                            "tokenfilter_ngram"
                        ]
                    },
                    "id_analyzer2": {
                        "type": "custom",
                        "tokenizer": "whitespace",
                        "filter": [
                            "word_delimeter",
                        ]
                    },
                    "ng_analyzer": {
                        "type": "custom",
                        "tokenizer": "whitespace",
                        "filter": [
                            "lowercase",
                            "tokenfilter_ngram"
                        ]
                    }
                },
                "filter": {
                    "word_delimeter": {
                        "type": "word_delimiter",
                        "generate_number_parts": True,
                        "catenate_words": True,
                        "catenate_numbers": True,
                        "preserve_original": True
                    },
                    "tokenfilter_ngram": {
                        "type": "nGram",
                        "min_gram": "1",
                        "max_gram": "2"
                    }
                }
            }
        },
        "mappings": {
            "properties": {
                "doc.id": {
                    "type": "text",
                    "fields": {
                        "test": {
                            "type": "text",
                            "analyzer": "id_analyzer"
                        },
                        "test2": {
                            "type": "text",
                            "analyzer": "id_analyzer2"
                        },
                        "keyword" : {
                            "type": "keyword"
                        }
                    }
                },
                "doc.id_suggest": {
                    "type": "completion",
                    "analyzer": "standard"
                },
                "doc.payload.storage_number": {
                    "type": "text",
                    "fields": {
                        "test": {
                            "type": "text",
                            "analyzer": "ng_analyzer"
                        },
                        "keyword" : {
                            "type": "keyword"
                        }
                    }
                },
                "doc.storage_number_suggest": {
                    "type": "completion",
                    "analyzer": "standard"
                },
                "doc.payload.owner_inn": {
                    "type": "text",
                    "fields": {
                        "test": {
                            "type": "text",
                            "analyzer": "ng_analyzer"
                        },
                        "keyword" : {
                            "type": "keyword"
                        }
                    }
                },
                "doc.owner_inn_suggest": {
                    "type": "completion",
                    "analyzer": "standard"
                },
                "doc.payload.owner_kpp": {
                    "type": "text",
                    "fields": {
                        "test": {
                            "type": "text",
                            "analyzer": "ng_analyzer"
                        },
                        "keyword" : {
                            "type": "keyword"
                        }
                    }
                },
                "doc.owner_kpp_suggest": {
                    "type": "completion",
                    "analyzer": "standard"
                },
                "doc.payload.owner_name": {
                    "type": "text",
                    "fields": {
                        "test": {
                            "type": "text",
                            "analyzer": "ng_analyzer"
                        },
                        "keyword" : {
                            "type": "keyword"
                        }
                    }
                },
                "doc.owner_name_suggest": {
                    "type": "completion",
                    "analyzer": "standard"
                }
            }
        }
    }

    try:
        if not es_object.indices.exists(index_name):
            es_object.indices.create(index=index_name, body=settings)
            print('created index')
        created = True
    except Exception as ex:
        print(str(ex))
    finally:
        return created


def store_record(es_object, index_name, record):
    try:
        outcome = es_object.index(index=index_name, body=record)
        print("record added:", outcome)
    except Exception as ex:
        print('error in indexing data')
        print(str(ex))


def search(es_object, index_name, search):
    res = es_object.search(index=index_name, body=search)
    return res


if __name__ == '__main__':
    es = connect_elasticsearch()
    create_index(es, 'wheelsets')

    es.indices.refresh(index='wheelsets')