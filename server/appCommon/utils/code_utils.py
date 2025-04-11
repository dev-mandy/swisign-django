class CodeUtils:
    @classmethod
    def as_dict_list(cls):
        return [{'code': code, 'name': name} for code, name in cls.CHOICES]