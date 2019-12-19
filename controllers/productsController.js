var pool = require('../models/data');

module.exports.getAllProducts = async function (req, res, next) {
  const currentPage = Number(req.query.page) || 1;
  const offsetPage = (currentPage - 1) * 6;

  //Condition of page
  if (req.params.order == "Gia") {
    if (req.params.order2 == "giam") {
      var allProducts = await pool.query('SELECT DISTINCT * FROM "index" WHERE ("Brand" = $1 OR $1 = $4) AND ("Gioitinh"=$2 OR $2 = $4) AND ("Loai"=$3 OR $3 = $4) ORDER BY "Gia" DESC',
        [req.params.brand, req.params.user, req.params.type, 'ALL']);
      var allProOffset = await pool.query('SELECT DISTINCT * FROM "index" WHERE ("Brand" = $1 OR $1 = $4) AND ("Gioitinh"=$2 OR $2 = $4) AND ("Loai"=$3 OR $3 = $4) ORDER BY "Gia" DESC LIMIT 6 OFFSET $5',
        [req.params.brand, req.params.user, req.params.type, 'ALL', offsetPage]);
    }
    else {
      var allProducts = await pool.query('SELECT DISTINCT * FROM "index" WHERE ("Brand" = $1 OR $1 = $4) AND ("Gioitinh"=$2 OR $2 = $4) AND ("Loai"=$3 OR $3 = $4) ORDER BY "Gia"',
        [req.params.brand, req.params.user, req.params.type, 'ALL']);
      var allProOffset = await pool.query('SELECT DISTINCT * FROM "index" WHERE ("Brand" = $1 OR $1 = $4) AND ("Gioitinh"=$2 OR $2 = $4) AND ("Loai"=$3 OR $3 = $4) ORDER BY "Gia" LIMIT 6 OFFSET $5',
        [req.params.brand, req.params.user, req.params.type, 'ALL', offsetPage]);
    }
  }
  else if (req.params.order == "Ten") {
    if (req.params.order2 == "giam") {
      var allProducts = await pool.query('SELECT DISTINCT * FROM "index" WHERE ("Brand" = $1 OR $1 = $4) AND ("Gioitinh"=$2 OR $2 = $4) AND ("Loai"=$3 OR $3 = $4) ORDER BY "Ten" DESC',
        [req.params.brand, req.params.user, req.params.type, 'ALL']);
      var allProOffset = await pool.query('SELECT DISTINCT * FROM "index" WHERE ("Brand" = $1 OR $1 = $4) AND ("Gioitinh"=$2 OR $2 = $4) AND ("Loai"=$3 OR $3 = $4) ORDER BY "Ten" DESC LIMIT 6 OFFSET $5',
        [req.params.brand, req.params.user, req.params.type, 'ALL', offsetPage]);
    }
    else {
      var allProducts = await pool.query('SELECT DISTINCT * FROM "index" WHERE ("Brand" = $1 OR $1 = $4) AND ("Gioitinh"=$2 OR $2 = $4) AND ("Loai"=$3 OR $3 = $4) ORDER BY "Ten"',
        [req.params.brand, req.params.user, req.params.type, 'ALL']);
      var allProOffset = await pool.query('SELECT DISTINCT * FROM "index" WHERE ("Brand" = $1 OR $1 = $4) AND ("Gioitinh"=$2 OR $2 = $4) AND ("Loai"=$3 OR $3 = $4) ORDER BY "Ten" LIMIT 6 OFFSET $5',
        [req.params.brand, req.params.user, req.params.type, 'ALL', offsetPage]);
    }
  }
  else {
    var allProducts = await pool.query('SELECT DISTINCT * FROM "index" WHERE ("Brand" = $1 OR $1 = $4) AND ("Gioitinh"=$2 OR $2 = $4) AND ("Loai"=$3 OR $3 = $4)',
      [req.params.brand, req.params.user, req.params.type, 'ALL']);
    var allProOffset = await pool.query('SELECT DISTINCT * FROM "index" WHERE ("Brand" = $1 OR $1 = $4) AND ("Gioitinh"=$2 OR $2 = $4) AND ("Loai"=$3 OR $3 = $4) LIMIT 6 OFFSET $5',
      [req.params.brand, req.params.user, req.params.type, 'ALL', offsetPage]);
  }

  const limit = 6;
  const pageCount = Math.ceil(allProducts.rows.length / limit);
  const startIndex = allProOffset.rows.length > 0 ? (currentPage - 1) * limit + 1 : 0;
  const endIndex = allProOffset.rows.length > 0
    ? startIndex + allProOffset.rows.length - 1
    : 0;
  const totalItems = allProducts.rows.length > 0 ? allProducts.rows.length : 0;
  let path = new URL(
    req.protocol + "://" + req.get("host") + req.originalUrl
  );
  path.searchParams.delete("page");
  path = path.toString();
  console.log(path)
  const countBrand = await pool.query('SELECT "Brand", "Gioitinh", COUNT(*) AS soluong  FROM "index" WHERE "Gioitinh"=$1 GROUP BY "Brand", "Gioitinh"', [req.params.user]);
  const countType = await pool.query('SELECT "Loai","Gioitinh", COUNT(*) AS sl  FROM "index" WHERE "Gioitinh"=$1 GROUP BY "Loai","Gioitinh" ', [req.params.user]);

  res.render("products", {
    allProducts: allProOffset.rows,
    countBrand: countBrand.rows,
    countType: countType.rows,
    brand: req.params.brand,
    user: req.params.user,
    type: req.params.type,
    order: req.params.order,
    order2: req.params.order2,
    startIndex,
    endIndex,
    totalItems: allProducts.rows.length,
    pageCount,
    currentPage,
    path,
    headerTop: function () {
      if (req.isAuthenticated()) {
        return "headAuthen";
      } else {
        return "headUnAuthen";
      }
    },
    username: function () {
      if (req.isAuthenticated()) {
        return req.user.username;
      }
    }
  });
};
module.exports.getDetailProduct = async function (req, res) {
  const result = await pool.query('SELECT * FROM "index" as idx left join "detail" as dt ON idx.id = dt.id WHERE idx.id=$1', [req.params.product]);
  res.render("single", {
    data: result.rows, headerTop: function () {
      if (req.isAuthenticated()) {
        return "headAuthen";
      } else {
        return "headUnAuthen";
      }
    },
    username: function () {
      if (req.isAuthenticated()) {
        return req.user.username;
      }
    }
  });
}