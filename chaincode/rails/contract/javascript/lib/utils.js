const RailsHeader = ['AdditionalMarking', 'AssetNum', 'AverageTonnage', 'BpassetNum', 'CardStatus', 'Category', 'ChangedBy', 'ChangedDate', 'Classification', 'CreateDate',
  'Description', 'ExpirationGroup', 'ExtractionCause', 'ExtSystemID', 'GapsID', 'ExitSystemID', 'GNP', 'GroupOfRail', 'Hardening', 'IdINextSystem',
  'InventoryNumber', 'IsEdiTable', 'ItemNum', 'KindRail', 'LayingDate', 'LayingType', 'Length', 'Manufacturer', 'Marking', 'NumSmelting', 'OrigRecordID',
  'Parent', 'Pms', 'Provider', 'QualCategory', 'ID', 'RailGrade', 'RailHeight', 'RailInventoryNumber', 'RailLength', 'RailPurpose', 'RailStackID', 'RailType',
  'RollingDate', 'RollingMonth', 'SideWear', 'SiteID', 'Status', 'StoreID', 'StowageDate', 'Supervisor', 'UtilDate', 'VerticalWear', 'WayRail', 'CreatedAt',
  'UpdatedAt'];

function pack(objectType, data) {
  let dataString = '';
  if (data) {
    let dataVector = [];
    switch (objectType) {
      case 'rail':
        for (let header of RailsHeader) {
          if (data[header]) {
            dataVector.push(data[header]);
          } else {
            dataVector.push(' ');
          }
        }
        dataString = dataVector.join(',').replace(/\s/g, '');
        return dataString;
      default:
        return "";
    }
  }
}

function unpack(str) {
  const json = {};
  if (!str) {
    return json;
  }

  const values = str.split(',');
  for (const [idx, header] of RailsHeader.entries()) {
    if (values[idx]) {
      json[header] = values[idx];
    }
  }

  return json;
}

module.exports.pack = pack;
module.exports.unpack = unpack;