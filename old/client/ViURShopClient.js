import {getSkey, request} from './HttpClient.js';

// Note: Order of functions should always be RCUD (this is NOT a typo of CRUD!)

/**
 * ViUR Shop Client
 */
export class ViURShopClient {

    /**
     * URL to the shop-backend (ViUR server)
     */
    host_url;

    /**
     * Name of the shop root module
     */
    shop_module;

    /**
     * URL to shop root module with the default renderer
     */
    shop_url;

    /**
     * URL to shop root module with the json renderer
     */
    shop_json_url;

    /**
     * URL to shop API module with the default renderer
     */
    shop_api_url;

    constructor({
                    host_url = null,
                    shop_module = 'shop',
                } = {}) {
        if (host_url === null) {
            try {
                this.host_url = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : window.location.origin;
            } catch (e) {
                // The import crashes in a bundled runtime
                this.host_url = window.location.origin;
            }
        } else {
            this.host_url = host_url;
        }
        this.shop_module = shop_module;
        this.shop_url = `${this.host_url}/${this.shop_module}`;
        this.shop_json_url = `${this.host_url}/json/${this.shop_module}`;
        this.shop_api_url = `${this.shop_url}/api`;
        this.getStructure_url = `${this.host_url}/vi/getStructure`;
    }


    // --- Article ------------------------------------------------------------

    article_view({
                     article_key,
                     parent_cart_key,
                 } = {}) {
        return request(`${this.shop_api_url}/article_view`, {
            params: {
                'article_key': article_key,
                'parent_cart_key': parent_cart_key,
            },
        })
            .then(req => req.json());
    }


    article_add({
                    article_key,
                    parent_cart_key,
                    quantity = 1,
                    quantity_mode = 'increase',
                } = {}) {
        return request(`${this.shop_api_url}/article_add`, {
            method: 'POST',
            params: {
                article_key,
                parent_cart_key,
                quantity,
                quantity_mode,
            },
        })
            .then(req => req.json());
    }

    article_update({
                       article_key,
                       parent_cart_key,
                       quantity = 1,
                       quantity_mode = 'increase',
                   } = {}) {
        return request(`${this.shop_api_url}/article_update`, {
            method: 'POST',
            params: {
                article_key,
                parent_cart_key,
                quantity,
                quantity_mode,
            },
        })
            .then(req => req.json());
    }


    article_remove({
                       article_key,
                       parent_cart_key,
                   } = {}) {
        return request(`${this.shop_api_url}/article_remove`, {
            method: 'POST',
            params: {
                article_key,
                parent_cart_key,
            },
        })
            .then(req => req.json());
    }

    // --- Basket ---------------------------------------------------------------
    basket_list() {
        return request(`${this.shop_api_url}/basket_list`).then(req => req.json());
    }

    // --- Cart ---------------------------------------------------------------

    /**
     * List root nodes or children of a cart
     *
     * If a cart key is provided, the direct children (nodes and leafs) will
     * be returned.
     * Otherwise (without a key), the root nodes will be returned.
     *
     * @param {string} cart_key list direct children (nodes and leafs) of this parent node
     * @returns {Promise<Response>}
     */
    cart_list({cart_key = null} = {}) {
        const self = this;
        return request(`${this.shop_api_url}/cart_list`, {
            params: cart_key === null ? {} : {cart_key},
        })
            .then(req => req.json());
    }

    /**
     * Add a new cart node
     *
     * @param {string} parent_cart_key Key of the parent cart
     * @param {CartType} cart_type Type of the cart node, see `CartType`
     * @param {string=} name Optional. Name of the cart node
     * @param {string=} customer_comment Optional. Comment to this node, by customer.
     * @param {string=} shipping_address_key Optional. Key of the address
     * @param {string=} shipping_key Optional. Key of the shipping
     * @param {string=} discount_key Optional. Key of the discount
     * @returns {Promise<Response>}
     */
    cart_add({
                 parent_cart_key,
                 cart_type,
                 name,
                 customer_comment,
                 shipping_address_key,
                 shipping_key,
                 discount_key,
             } = {}) {
        return request(`${this.shop_api_url}/cart_add`, {
            method: 'POST',
            params: this.removeUndefinedValues({
                parent_cart_key,
                name,
                cart_type,
                customer_comment,
                shipping_address_key,
                shipping_key,
                discount_key,
            }),
        })
            .then(req => req.json());
    }

    /**
     * Update an existing cart node
     *
     * @param {string} cart_key Key of the cart node to be updated
     * @param {CartType} cart_type Type of the cart node, see `CartType`
     * @param {string=} name Optional. Name of the cart node
     * @param {string=} customer_comment Optional. Comment to this node, by customer.
     * @param {string=} shipping_address_key Optional. Key of the address
     * @param {string=} shipping_key Optional. Key of the shipping
     * @param {string=} discount_key Optional. Key of the discount
     * @returns {Promise<Response>}
     */
    cart_update({
                    cart_key,
                    cart_type,
                    name,
                    customer_comment,
                    shipping_address_key,
                    shipping_key,
                    discount_key,
                } = {}) {
        return request(`${this.shop_api_url}/cart_update`, {
            method: 'POST',
            params: this.removeUndefinedValues({
                cart_key,
                cart_type,
                name,
                customer_comment,
                shipping_address_key,
                shipping_key,
                discount_key,
            }),
        })
            .then(req => req.json());
    }

    /**
     * Remove a cart node.
     * Removes itself and all children
     *
     * @param {string} cart_key Key of the cart node to be removed
     * @returns {Promise<Response>}
     */
    cart_remove({cart_key} = {}) {
        return request(`${this.shop_api_url}/cart_remove`, {
            method: 'POST',
            params: {
                cart_key,
            },
        })
            .then(req => req.json());
    }

    cart_structure() {
        return request(`${this.getStructure_url}/${this.shop_module}.cart`, {
            method: 'GET',
        })
            .then(req => req.json());
    }

    // --- Address ------------------------------------------------------------

    address_list({} = {}) {
        const self = this;
        return request(`${this.shop_json_url}/address/list`, {
            params: {
                limit: 100,
            },
        })
            .then(req => req.json())
            .then(response => response.skellist);
    }

    address_add({
                    customer_type,
                    salutation,
                    company_name,
                    firstname,
                    lastname,
                    street_name,
                    street_number,
                    address_addition,
                    zip_code,
                    city,
                    country,
                    customer_key,
                    is_default,
                    address_type,
                } = {}) {
        return getSkey()
            .then(skey => {
                return request(`${this.shop_json_url}/address/add`, {
                    method: 'POST',
                    params: this.removeUndefinedValues({
                        skey,
                        customer_type,
                        salutation,
                        company_name,
                        firstname,
                        lastname,
                        street_name,
                        street_number,
                        address_addition,
                        zip_code,
                        city,
                        country,
                        customer: customer_key,
                        is_default,
                        address_type,
                    }),
                })
                    .then(req => req.json())
                    .then(response => response.values);
            });
    }

    address_structure() {
        return request(`${this.shop_json_url}/address/structure`, {
            method: 'GET',
        })
            .then(req => req.json());
    }

    // --- Order --------------------------------------------------------------

    payment_providers_list({} = {}) {
        return request(`${this.shop_url}/order/payment_providers_list`)
            .then(req => req.json());
    }

    order_add({
                  cart_key,
                  payment_provider,
                  billing_address_key,
                  email,
                  customer_key,
                  state_ordered,
                  state_paid,
                  state_rts,
              } = {}) {
        return request(`${this.shop_api_url}/order_add`, {
            method: 'POST',
            params: this.removeUndefinedValues({
                cart_key,
                payment_provider,
                billing_address_key,
                email,
                customer_key,
                state_ordered,
                state_paid,
                state_rts,
            }),
        })
            .then(req => req.json());
    }

    order_update({
                     order_key,
                     payment_provider,
                     billing_address_key,
                     email,
                     customer_key,
                     state_ordered,
                     state_paid,
                     state_rts,
                 } = {}) {
        return request(`${this.shop_api_url}/order_update`, {
            method: 'POST',
            params: this.removeUndefinedValues({
                order_key,
                payment_provider,
                billing_address_key,
                email,
                customer_key,
                state_ordered,
                state_paid,
                state_rts,
            }),
        })
            .then(req => req.json());
    }

    order_checkout_start({
                             order_key,
                         } = {}) {
        return request(`${this.shop_url}/order/checkout_start`, {
            method: 'POST',
            params: {order_key},
        })
            .then(req => req.json());
    }

    order_checkout_order({
                             order_key,
                         } = {}) {
        return request(`${this.shop_url}/order/checkout_order`, {
            method: 'POST',
            params: {order_key},
        })
            .then(req => req.json());
    }

    order_pp_get_settings({
                              order_key,
                          } = {}) {
        return request(`${this.shop_url}/order/checkout_order`, {
            method: 'POST',
            params: {order_key},
        })
            .then(req => req.json());
    }


    // --- User ---------------------------------------------------------------

    user_view({
                  user_key = 'self',
              } = {}) {
        return request(`${this.host_url}/json/user/view/${user_key}`)
            .then(req => req.json())
            .then(response => response.values);
    }


    // --- Discount -----------------------------------------------------------
    /**
     * Add a Discount to the current Cart.
     * @param {string} code Human readable Discount Code
     * @param {string} discount_key Database Key from a Discount.
     * @returns {Response<Response>}
     */
    discount_add({
                     code,
                     discount_key,
                 } = {}) {
        return request(`${this.shop_api_url}/discount_add`, {
            method: 'POST',
            params: this.removeUndefinedValues({
                code,
                discount_key,
            }),
        })
            .then(req => req.json());
    }

    /**
     * Removes a Discount by the Database Key
     * @param {string} discount_key Database Key from a Discount.
     * @returns {Promise<Response>}
     */
    discount_remove({
                        discount_key,
                    } = {}) {
        return request(`${this.shop_api_url}/discount_remove`, {
            method: 'POST',
            params: {discount_key},
        })
            .then(req => req.json());
    }


    // --- Shipping -----------------------------------------------------------

    /**
     * Lists available shipping options for a (sub)cart
     * @param {string} cart_key Key of the parent cart
     * @returns {Promise<Response>} List of ShippingsSkels
     */
    shipping_list({
                      cart_key,
                  } = {}) {
        return request(`${this.shop_api_url}/shipping_list`, {
            method: 'GET',
            params: {cart_key},
        })
            .then(req => req.json());
    }


    // --- Utils -------------------------------------------------------------

    removeUndefinedValues(obj) {
        return Object.fromEntries(
            Object.entries(obj)
                .filter(([key, value]) => value !== undefined),
        );
    }
}
