__author__ = 'trevor'

# def Wizard(self):
#
#   wands = 1
#
#   def init():
#       self.name = name
#       self.wand_name = wand_name
#       self.broom_type = broom_type
#       self.pet = pet
#       self.specialty_spell = specialty_spell
#       self.speak = speak
#
# def speak():
#     print "I am a wizard with my wand's name is %s and it casts %s spells"
#
#
#
#
# Wizard.self (Gandolf, Lorethil, false, moths, "you shall not pass", "you shall not pass")
#
# print Gandolf.self

class Wizard(object):

      wands = 1

      def __init__(self, name, wand_name, broom_type, pet, specialty_spell, ):
          self.name = name
          self.wand_name = wand_name
          self.broom_type = broom_type
          self.pet = pet
          self.specialty_spell = specialty_spell
          self.speak = speak

        def speak(self):
            print "I am a wizard with my wand's name is %s and it casts %s spells" % \ (self.wand_name, self.specialty_spell)


gandolf = Wizard ("Gandolf" , "Lorethil", False, "moths", "you shall not pass", "you shall not pass")
gandolf.speak()

