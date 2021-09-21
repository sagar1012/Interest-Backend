
var interest = new require("./interestSchema");

module.exports.add = (req) => {
    return new Promise((resolve, reject) => {
        interest.Interest.findOneAndUpdate({
            fullName: req.body.fullName,
            email: req.body.email,
            gender: req.body.gender,
            interest: req.body.interest,
        },
            {
                "$set": req.body
            }, {
            "upsert": true,
            "new": true
        }, function (err, data) {
            if (err) {
                return reject({
                    status: false,
                    message: err,
                    data: null
                });
            } else {
                return resolve({
                    status: true,
                    message: "Interest successfully added",
                    data: data
                });
            }
        });
    });
}

module.exports.get = (req) => {
    var sortBy, sortOrder, current_page, pageSize, query;
    var sortObject = {}, resp = {}, filterValue = {};

    if (req.body.statusKey && req.body.statusValue) {
        filterValue[req.body.statusKey] = req.body.statusValue;
    }


    sortBy = req.body.sortBy ? req.body.sortBy : 'sort';
    sortOrder = req.body.sortOrder ? req.body.sortOrder : 1;
    sortObject[sortBy] = sortOrder;
    current_page = req.body.pageNumber ? req.body.pageNumber : 1;
    pageSize = req.body.pageSize ? req.body.pageSize : 10;

    return new Promise((resolve, reject) => {
        interest.Interest.find({ filterValue }).countDocuments().exec(function (err, data) {
            resp = {
                "meta": {
                    "sort_applied": {
                        "id": "sort",
                        "name": "Sort",
                        "value": sortObject
                    }, "pagination": {
                        "current_page": current_page,
                        "per_page": pageSize,
                        "total_count": data,
                        "total_pages": data % pageSize == 0 ? data / pageSize : parseInt(data / pageSize) + 1
                    }
                }
            };
        });
        query = interest.Interest.find(filterValue).sort(sortObject).skip(pageSize * (current_page - 1)).limit(pageSize);
        query.exec(function (err, data) {
            if (err)
                return reject({
                    status: false,
                    message: err
                });
            else {
                resp["data"] = data;
                return resolve({
                    status: true,
                    message: resp
                });
            }
        });
    });
};


module.exports.update = (req) => {
    return new Promise((resolve, reject) => {
        interest.Interest.findOneAndUpdate({
            '_id': req.body.documentId,
        }, {
            '$set': req.body
        }, {
            'upsert': false,
            'new': true
        },
            function (err, address) {
                if (err) {
                    return reject({
                        status: false,
                        data: err
                    });
                } else {
                    return resolve({
                        status: true,
                        message: "Interest update successfully"
                    });
                }

            });
    });
};

module.exports.delete = (req) => {
    return new Promise((resolve, reject) => {
        interest.Interest.deleteOne({
            "_id": req.body.documentId
        }, function (err, data) {
            if (err)
                return reject({
                    status: false,
                    message: err
                });
            else
                return resolve({
                    status: true,
                    data: data,
                    message: "Interest delete successfully"
                });
        })
    });
};
