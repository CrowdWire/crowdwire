__author__ = 'trevor'

class Tool(object):

    def __init__(self, name, purpose):
        self.name = name
        self.purpose = purpose

    def sound(self,):
        print "Noisy"

hammer = Tool("hammer", "pounding")


#this is a class that inherits from the Tool class.  This is done by simply putting the Tool in the () for Hammer
class Hammer(Tool):

    def sound (self,):
        print "Bam-Bam"

