# KSDT API
## Overview
This is KSDT Radio's public API. This RESTful API allows clients to autheticate users, retrieve data, and post information in KSDT Radio's Database. The API requires a developer key in order to be used. In order to gain access to said key a request must be made at our developer site and after approval the user will obtain a key for the API. For any other inquiries please reach out to KSDT Radio.

## Usage
### Overview
This is a RESTful API, meaning all services are preformed with the routes described bellow. Please use the following as reference for your projects. A test build is also available for local development and project testing. Details on how to develop for KSDT Radio will be at the developer area.

### Types of entries
There are five entry types that anyone can be create and a sixth that is only accessible privately. The following are the entry types together with their corresponding URL encoding type, mandatory fields, and optional fields.

- Users
    - Encoding type: **users**
- Bookings
    - Encoding type: **bookings**
- Sessions
    - Encoding type: **sessions**
- Workshops
    - Encoding type: **workshops**
- Qualifications
    - Encoding type: **qualifications**
- Keys **_(private)_**

### User Authentication
Most operations require a user to be authenticated and an authentication cookie to be generated. This can be done through a POST request with form:

```
https://api.ksdt.edu/authentication
```

Having a JSON string with the following format in the request's body:

```
{
    'email': {USER EMAIL},
    'password': {USER PASSWORD}
}
```

### Creating entries

Public enntries can be created through POST requests to the corresponding route:

```
https://api.ksdt.ucsd.edu/{ENTRY ENCODING TYPE}?{API KEY}
```

Where **{ENTRY ENCODING TYPE}** is one of the types specified above. Any POST request must have a body containing the required information for each user and will receive an error message otherwise.

*Authentication Cookie Required*

### Reading information

All public entries can be read an any time through a GET request to the corresponding route:

```
https://api.ksdt.ucsd.edu/{ENTRY ENCODING TYPE}/{ENTRY ID}?{API KEY}
```

Where **{ENTRY ENCODING TYPE}** is one of the types pecified above and **{ENTRY ID}** is either the id of a specific entry or **"all"** for an array of all entries of the type. In the case of requesting an array of all entries, limited information about each entry will be given depending on the entry to ensure user privacy.

*Authentication Cookie Required depending on query*

### Updating entries

All public entries can be updated with a PUSH request to the server containing permissions and the corresponding update information in the form of a JSON encoded string in the request's body. All updates will be parsed and validated and in case of incorrect formating an error will be returned in the response. Requests can be done to the following route:

```
https://api.ksdt.edu/{ENTRY ENCODING TYPE}/{ENTRY ID}?{API KEY}
```

Where **{ENTRY ENCODING TYPE}** is one of the types specified above and **{ENTRY ID}** is the id of the specific entry that must be updated. Certain operations require certain levels of authentication and only certain fields can be updated. Read the entry type's documentation to know the authentication requirements for the specific needs of each entry type. In case of needed user authentication an Authentication Cookie might be required.

*Authentication Cookie Required depending on query*

## Deleting entries

All public entries can be deleted with a DELETE request to the server containing appropriate permissions as an authentication cookie. Private entries can only be deleted by the administrator, and in order to preform these sort of operations please email the radio station. All deletion requests will be parsed and validated for posible authorization errors. Requests can be done to the following route:

```
https://api.ksdt.edu/{ENTRY ENCODING TYPE}/{ENTRY ID}?{API KEY}
```

Where **{ENTRY ENCODING TYPE}** is one of the types specified above and **{ENTRY ID}** is the id of the specific entry to be deleted. Read the entry type's documentation to see further information on authorization requirements for the deletion of a specific entry type. Some might only be deleted by an administrator.

*Authentication Cookie Required*