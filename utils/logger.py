import sys
import logging

def init_logger():
    logger = logging.getLogger()
    logger.setLevel(logging.DEBUG)
    shandler = logging.StreamHandler(sys.stdout)
    shandler.setLevel(logging.DEBUG)
    formatter = logging.Formatter("[%(asctime)s] [%(levelname)s] - %(message)s", "%H:%M:%S")
    shandler.setFormatter(formatter)
    logger.addHandler(shandler)
    return logger

logger = init_logger()
