# History

## 1.4.1 / 2013-04-20

- [bug fix] Typo `ture` -> `true`



## 1.4.0 / 2013-04-20

- [bug fix] Validator `is` only take string now
- [new feature] Add `isBool` & `isBoolean`
- [refactoring] Better `utils.typeof`



## 1.3.2 / 2013-04-14

- [bug fix] Fix the same fucking bug



## 1.3.1 / 2013-04-14

- [update packages] node.extend->1.0.3
- [bug fix] Make sure `isArray` & `toArray` work properly



## 1.3.0 / 2013-04-12

- [update packages] inflection->1.2.5, express->2.5.11, node.extend->1.0.2, validator->0.5.0
- [refactoring] Array value has to call `isArray` first



## 1.2.0 / 2013-01-02

- [bug fix] For array elements stay as array elements even without calling `toArray`



## 1.1.5 / 2012-07-17

- [bug fix] Undefined value for mix & max length



## 1.1.4 / 2012-06-26

- [update packages] inflection->1.2.1, express->2.5.10, validator->0.4.9



## 1.1.3 / 2012-05-30

- [bug fix] Skip `undefined` value no matter what



## 1.1.2 / 2012-05-01

- [bug fix] Skip `undefined` value if its not required



## 1.1.1 / 2012-05-01

- [refactoring] Returns error only if the field is required for isArray
- [refactoring] Use default structure to show error msgs



## 1.1.0 / 2012-05-01

- [refactoring] Remove default value for none array prop



## 1.0.0 / 2012-05-01

- Initial release
