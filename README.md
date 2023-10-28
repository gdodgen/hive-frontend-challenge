# Hive Frontend Engineer Challenge
My dropdown component and a demo page

## Local Setup:
1. Download and Install Node.js for your operating system if you do not have it [(Latest Download)](https://nodejs.org/en/download/current)
2. Install packages in project folder:

```shell
npm install
```
3. Run project:

```shell
npm run start
```
The project will automatically open in your browser

## Component Props

| Prop      | Description | Type | Required | Default |
| ----------- | ----------- | ----------- | ----------- | ----------- |
| options | Array of options for the dropdown | array |Yes |
| onSelect | onSelect callback | function | Yes | 
|isMultiselect| Used to indicate single or multiple select style dropdown | Boolean | No | false |
|label| Label that appears above the dropdown | string | No | none |
|placeholder| Text that appears inside the menu before selecting an option | string | No | "Select" |
|width| Used to set custom width of the drowdown element in pixels | number | No | 180 |
