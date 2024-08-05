const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {

  const query = req.query.q;

  let items = [], category;

  try {

    const searchResponse = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=4`);
    const itemsData = searchResponse.data.results;

    if (itemsData.length > 0) {

      items = await Promise.all(itemsData.map(async item => {

        let itemDetailsResponse = await axios.get(`https://api.mercadolibre.com/items/${item.id}`);
        let itemDetails = itemDetailsResponse.data;

        let picture = itemDetails.pictures.length > 0 ? itemDetails.pictures[0].url : item.thumbnail;

        return {
          id: item.id,
          title: item.title,
          price: {
            currency: item.currency_id,
            amount: Math.floor(item.price),
            decimals: item.price % 1
          },
          picture: picture,
          condition: item.condition,
          free_shipping: item.shipping.free_shipping,
          seller_address: itemDetails?.seller_address?.state?.name ?? ""
        };

      }));

      category = await axios.get(`https://api.mercadolibre.com/categories/${itemsData[0].category_id}`);

    }

    res.json({
      
      categories: category?.data ? category.data.path_from_root : [],
      
      items: itemsData ? items : []
   
    });

  } catch (error) {

    res.status(500).send(error.message);

  }

});

// 
router.get('/:id', async (req, res) => {

  const id = req.params.id;

  try {

    const [itemResponse, descriptionResponse] = await Promise.all([

      axios.get(`https://api.mercadolibre.com/items/${id}`),
      axios.get(`https://api.mercadolibre.com/items/${id}/description`)

    ]);

    const category = await axios.get(`https://api.mercadolibre.com/categories/${itemResponse.data.category_id}`);

    const item = itemResponse.data;
    const description = descriptionResponse.data;

    let builtProduct;

    if (item && description) {

      builtProduct = {

        id: item.id,
        title: item.title,
        price: {
          currency: item.currency_id,
          amount: Math.floor(item.price),
          decimals: item.price % 1
        },
        picture: item.pictures[0].url,
        condition: item?.attributes.find(x => x.id == "ITEM_CONDITION")?.value_name ?? "",
        free_shipping: item.shipping.free_shipping,
        sold_quantity: item.sold_quantity,
        description: description.plain_text

      }

    }

    res.json({

      categories: category?.data ? category.data.path_from_root : [],

      item: (item && description) ? builtProduct : null

    });

  } catch (error) {

    res.status(500).send(error.message);

  }

});

module.exports = router;