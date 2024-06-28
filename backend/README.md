# Django-Rest-Framework Shop

## For use this project :

 <br/>

1. Make Sure You Have Installed Python

 <br/>

2. ```
   cd yourproject
   ```

3. Create an virtual environment :
   - In windows
    ```
    py -m venv venv
    ```
   - In linux
    ```
    python3 -m venv venv
    ```
    

4. activate env :
    - In windows
    ```
    venv\scripts\activate.bat
    ```
    - In linux
    ```
    source venv/bin/activate
    ```

5. Then run these commands :
  
    - `pip install -r requirements.txt`
    - `py manage.py makemigrations`
    - `py manage.py migrate`
    - `py manage.py createsuperuser`
    - `pu manage.py runserver`

---

# API Info
> **Content-Type :** `application/json`
> 
> **Routes :** `GET /api/`
> 
> **Base Url :** `/api/...`

<!-- ---------------------------------------------------------------------------------------- -->
## Accounts :

 ```
 POST /auth/login/ 
 ```
>  - body (required) : `["phone_number", "password"]`
>  - response : `a json includs "accsess" and "refresh" tokens for header`


 ```
 POST /auth/login/refresh/
 ```
>  - body(required) : `["refresh", ]`
>  - response : `refresh token`


 ```
 POST /auth/logout/
 ```
>  - header : `Bearer {token}`
>  - response : `"confirm message"`


 ```
 POST /auth/register/
 ```
>  - body (required) : `["phone_number", "password"]`
>  - response : `"confirm message"`


 ```
 POST /auth/forgot_password/
 ```
>  - body(required) : `["phone_number", ]`
>  - response : `"confirm message"`


 ```
 PUT /auth/confirm/
 ```
>  - response : `"a confirm message for send otp"`
  

 ```
 PUT /auth/change_password/:user_id/
 ```
>  - body : `["old_password", "password1", "password2"]`
>  - response : `"a success message for change password"`

---
---

<!-- ---------------------------------------------------------------------------------------- -->
## Products :

 ```
 GET /products/
 ```
>  - response : `a list of product variations`


 ```
 GET /product-detail/:product_id/
 ```
> - response : `a single product variation for details :`

```
products_variations [ 
      id,
      product_name, 
      product_model, 
      short_description, 
      features [key, value], 
      color [name, code],
      images,
      price, 
      discount(%), 
      price_with_discount, 
      quantity, 
      is_available, 
      created_at, 
      product[
        id,
        name,
        complete_descriptions,
        is_available,
        created_at,
        brand [title, image],
        image [image, ],
        category [title, image],
        ]]
```

---
---

<!-- ---------------------------------------------------------------------------------------- -->
## Category :

 ```
 GET /category/
 ```
>  - response : `a list of category`

---
---

<!-- ---------------------------------------------------------------------------------------- -->
## Carts :

 ```
 GET /cart/
 ```
> -  response : `a list of carts :`

 ```
 POST /cart/add-or-remove/
 ```
 ```
 DELETE /cart/add-or-remove/
 ```
>  - body for POST : `["product_id", "quantity", "color"]`
>  - body for DELETE : `["product_id", "color", ]`
>  - response : `a confirm message for DELETE or POST`
    
---
---

<!-- ---------------------------------------------------------------------------------------- -->
## Dashboard :

 ```
 GET /dashboard/
 ```
 ```
 POST /dashboard/
 ```
 ```
 PUT /dashboard/
 ```
>  - body for POST : `["first_name", "last_name", "address", "state", "postalcode"]  `
>  - response : `a success message for POST or PUT`

---
---

<!-- ---------------------------------------------------------------------------------------- -->
## Orders :

 ```
 GET /orders/
 ```
 ```
 POST /orders/
 ```
>  *carts will be add to order automaticly
 ```
 DELETE /orders/
 ```
>  - body for DELETE : `["code", ]`
>  - response : `a success message for POST or canceled message for DELETE`

