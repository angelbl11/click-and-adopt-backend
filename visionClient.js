const credentials = JSON.parse(
  JSON.stringify({
    type: "service_account",
    project_id: "clickandadopt",
    private_key_id: "1b16d057f42d3497be5518e148f9d00f48ac0d71",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCtqLQ+G5ymUV8x\nNd6T70NXMaSJooRtkkWjy+Cd7I9bLNZBrt+LCmcFO/AES+fY+exC7z78hmPZI1HE\ntAiS0SHk+Clye47aMihe3X3BfRVGkIHUBU8S+zpEhkeqgudyHouElFGReih3lI7P\n7A+vX9mvbNN76oDb1CJV5C32Nfa7uQFmg/FQHhDgO7yUDNrOqZSWGWHWD2ak6vsU\nMIbWMqvNY7OndzMTyURANc5SK5av2SyNtgd51Jwf0KuXYuUuuEBfAaijriLyskYN\nduL3Ec1Cari4R8v1gxUeL2oWsrfscMBZh0KvhPHfk7v6sSZtCaHLLL6ZsMoC21lu\nZKHORLNfAgMBAAECggEAAWxeRK0wsBDaq3NxAdw/l+dbr5djHnmkb1WH33pXu5eS\nfEULy2yDi6UmsCt4PUgqidjC//f+lO/gmWeODwFsXtZXkuiioNBWJF6epvUK7Cts\nLiCvTBY+eJXhKaJSLHHYN3cbKuYTIR6iA9/23F/4KxEN2GYoNe4uB5PnMRsgHyUs\n+if+nMYroFO4lFPOdzkjh/R4wEDpBz7CkqUw2pIATBKWcCWIj3aJqwQml7U7pvN0\nzzI4e6w50yoc69HVJQb4HS/YOYtvoR7UGk7U7g3JctcQ5sGfSvsEUH8GGf0S5k1e\ndUFFKXu8oD4mVcLYwuWKG16mOGsK6Qt63OE6n/ItAQKBgQDxDhK0H5LmRFx/Kd3Y\nLldMrxgkLx+mNCK4W8y27y6rJmUJ4PRXlH2T4JtenRAgk+S1RUnF/5pzYgHJmeBC\njb/saCU/W4+o4uQHFiHrr7Cb6c8QQvBK6xBsbhtajytQDPzsYLWMRNt31aRLPE28\noWsZ2F/kRguoTfjoVsO7mHhDGQKBgQC4bPMNKegdtT0JpaRrZSPCepyu31YV4aHP\nquKwbLxfQWYLmq2M3FI7EjVyxUIqlUyLzlT8wyYb9arknA/K7xPVy9nVAtV5hjER\nN0uGYVGiV0X+d2g6wxVPUeRAnORlLKtLo/qARTIA22dnQRfctY1wo3YJEa5wXwwn\nY5FW8ZqxNwKBgE2gm5NYC6WN5D+rSt7gZYqzZFHavxV1+qxmG7HZqqzBK46X2/gM\nQLiLf11jtRrYpbFeg9h4bNO1fx/eJuMn5OOL0lrp8ISRtJ83mGre5EABdoYlGF73\n/gz9FGAAdRFNbXHt3ukyD38y1LrJy7rwPJ5RGOhZSk3D9mFT96qE+k2ZAoGBAKk6\nD6w8j+jyrRd1DvIc1DtYFv2/oVZiu/+6ZlhM7mzZrbFoNWfTowDhLHor1xML/Dkt\nE3778rQlMLKlITitOB4t96wl9YyVPeD2RC8Cjc3RF0DwgIurBprKIg/H5yuPWX8G\n8I1S8RcoPDHa4PJ9BVQeKekYeGBUVuqtymdlOvTxAoGANpq/YGpic0VHDJgKts1p\ndrxoVWJfDHz6QzZ+cCAfXwNApA6NgfDpjraj0jU2o0dajjkSUyDO2nj3RBRqkw9i\nv0Yi6gqDJQGaYq6UxcCEKAI8hi2ljk4We/IpZ+dgnn3XUGJ0JQg2ZKG+l6NPl2lQ\n/BfMJVyEoXPqopFfN6AZJQ0=\n-----END PRIVATE KEY-----\n",
    client_email: "click-and-adopt@clickandadopt.iam.gserviceaccount.com",
    client_id: "105194058054966295932",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/click-and-adopt%40clickandadopt.iam.gserviceaccount.com",
  })
);

module.exports = {
  CONFIG: {
    credentials: {
      private_key: credentials.private_key,
      client_email: credentials.client_email,
    },
  },
};
