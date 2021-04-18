export const PROP_MAPPING = [
  ['id', 'id', 'Id'],
  ['name', 'name', 'Name'],
  ['username', 'username', 'Username'],
  ['email', 'email', 'Email'],
  ['street', 'address.street', 'Street address'],
  ['suite', 'address.suite', 'Suite'],
  ['city', 'address.city', 'City'],
  ['zipcode', 'address.zipcode', 'Zip code'],
  ['lat', 'address.geo.lat', 'Latitude'],
  ['lng', 'address.geo.lng', 'Longitude'],
  ['phone', 'phone', 'Phone number'],
  ['website', 'website', 'Website'],
  ['companyName', 'company.name', 'Company name'],
  ['catchPhrase', 'company.catchPhrase', 'Catch phrase'],
  ['bs', 'company.bs', 'Business']
];

export function getPropByPath(obj, desc) {
  // https://stackoverflow.com/questions/8051975/access-object-child-properties-using-a-dot-notation-string
  const arr = desc.split('.');
  while (arr.length && (obj = obj[arr.shift()])) { }
  return obj;
}


