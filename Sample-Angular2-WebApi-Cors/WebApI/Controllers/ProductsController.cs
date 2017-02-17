using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Hosting;
using System.Web.Http;
using WebApI.Models;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using Newtonsoft.Json;

namespace WebApI.Controllers
{
    [EnableCors("*", "*", "*")]
    public class ProductsController : ApiController
    {
        private List<Product> Products;
        public ProductsController()
        {
            var filepath = HostingEnvironment.MapPath("~/App_Data/product.json");
            var jsonContent = System.IO.File.ReadAllText(filepath);

            Products = JsonConvert.DeserializeObject<List<Product>>(jsonContent);

        }

        [ResponseType(typeof(Product))]
        public IHttpActionResult Get()
        {
            return Ok(this.Products.AsQueryable());
        }

        // GET: api/Products/5
        [ResponseType(typeof(Product))]
        public IHttpActionResult Get(int id)
        {
            var prd = this.Products.FirstOrDefault(x => x.ProductId == id);
            return Ok(prd);
        }


        // POST: api/Products
        [ResponseType(typeof(Product))]
        public IHttpActionResult Post(int id,[FromBody]Product product)
        {


            var newProd = product;
            newProd.ProductId = this.Products.Count + 1;
            this.Products.Add(newProd);
            WriteData();
            return Ok(newProd);
        }

        // PUT: api/Products/5
        [ResponseType(typeof(Product))]
        public IHttpActionResult Put(int id, [FromBody]Product product)
        {
            var indx = this.Products.FindIndex(x => x.ProductId == product.ProductId);

            this.Products[indx] = product;

            WriteData();

            return Ok(product);
        }

        // DELETE: api/Products/5
        public IHttpActionResult Delete(int id)
        {
            var indx = this.Products.FindIndex(x => x.ProductId == id);

            this.Products.RemoveAt(indx);

            WriteData();
            return Ok();
        }

        internal void WriteData()
        {
            // Write out the Json
            var filePath = HostingEnvironment.MapPath(@"~/App_Data/product.json");

            var json = JsonConvert.SerializeObject(this.Products, Formatting.Indented);
            System.IO.File.WriteAllText(filePath, json);
        }
    }
}
