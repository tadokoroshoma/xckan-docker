# coding: utf-8
import os


class BaseConfig(object):
    # Site environtments
    SOLR_CKAN_XSEARCH = 'http://solr:8983/solr/ckan-xsearch/'
    CKANLIST = '/conf/ckanlist.json'
    CACHEDIR = '/cache/'
    LOCKDIR = '/tmp/'  # Share all servers running on this machine

    # Flask settings
    JSON_AS_ASCII = False
    DEBUG = True
    PORT = 5000
    HOST = "0.0.0.0"

# site_config = BaseConfig
site_config = BaseConfig
