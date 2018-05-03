import axios from 'axios';


class Api {
  fetchByZipCode(zipcode){
    const baseUrl = 'http://testing.shippingapis.com/';
    const params ={
      XML:`<CityStateLookupRequest USERID="871IBM002710"><ZipCode ID="0"><Zip5>${zipcode}</Zip5></ZipCode></CityStateLookupRequest>`,
      API: 'CityStateLookup'
  };

    return axios.get(`${baseUrl}ShippingAPI.dll`, {params})
  }
}

export default new Api();
