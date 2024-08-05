
const express = require('express');
const axios = require('axios');
const router = express.Router();

// Ruta para buscar artículos basados en la consulta de la caja de búsqueda
router.get('/', async (req, res) => {

  const query = req.query.q;

  let items = [], category = null;

  try {

    // Solicitud a la API de MercadoLibre para buscar los productos
    const searchResponse = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=4`);
    const itemsData = searchResponse.data.results;

    if (itemsData.length > 0) {

      /*

        * Obtención de detalles adicionales solicitados
        * Obtención de imágen con mayor calidad que el thumbnail
      
      */

      items = await Promise.all(itemsData.map(async item => {

        const itemDetailsResponse = await axios.get(`https://api.mercadolibre.com/items/${item.id}`);
        const itemDetails = itemDetailsResponse.data;
        const picture = itemDetails.pictures.length > 0 ? itemDetails.pictures[0].url : item.thumbnail;

        // Armado del objeto según los requerimientos y la optimización de performance
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

      // Obtención del path de categorías para los productos buscados
      const categoryResponse = await axios.get(`https://api.mercadolibre.com/categories/${itemsData[0].category_id}`);
      category = categoryResponse.data;

    }

    res.json({
      categories: category ? category.path_from_root : [],
      items: itemsData ? items : []
    });

  } catch (error) {
    
    res.status(500).send(error.message);
  
  }

});

// Ruta para obtener el detalle del producto solicitado
router.get('/:id', async (req, res) => {

  const id = req.params.id;

  try {

    // Solicitudes paralelas en promesa para obtener el detalle y la descripción del producto
    const [itemResponse, descriptionResponse] = await Promise.all([
      axios.get(`https://api.mercadolibre.com/items/${id}`),
      axios.get(`https://api.mercadolibre.com/items/${id}/description`)
    ]);

    const item = itemResponse.data;
    const description = descriptionResponse.data;

    // Obtención del path de categorías para el producto solicitado
    const categoryResponse = await axios.get(`https://api.mercadolibre.com/categories/${item.category_id}`);
    const category = categoryResponse.data;

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
      categories: category ? category.path_from_root : [],
      item: (item && description) ? builtProduct : null
    });

  } catch (error) {

    res.status(500).send(error.message);
  
  }

});

module.exports = router;