// 400 Bad Request Errors

module.exports = {
    book: {
        isbn: {
            missing: {
                error: {
                    code: '"isbn" is missing',
                    message: 'Request must contain ISBN'
                }
            },

            incorrect: {
                error: {
                    code: 'Incorrect ISBN',
                    message: 'ISBN must be a string of 10 or 13 digits'
                }
            }
        },

        authorId: {
            missing: {
                error: {
                    code: '"authorId" is missing',
                    message: 'Request must contain book author ID'
                }
            },

            incorrect: {
                error: {
                    code: 'Incorrect author ID',
                    message: 'Author ID must be UUID'
                }
            }
        },

        categoryId: {
            missing: {
                error: {
                    code: '"categoryId" is missing',
                    message: 'Request must contain book category ID'
                }
            },

            incorrect: {
                error: {
                    code: 'Incorrect category ID',
                    message: 'Category ID must be UUID'
                }
            }
        },

        title: {
            missing: {
                error: {
                    code: '"title" is missing',
                    message: 'Request must contain book title'
                }
            },

            incorrect: {
                error: {
                    code: 'Incorrect title',
                    message: 'Title must be a string with a maximum length of 255 characters'
                }
            }
        },

        year: {
            missing: {
                error: {
                    code: '"year" is missing',
                    message: 'Request must contain book publication year'
                }
            },

            incorrect: {
                error: {
                    code: 'Incorrect year',
                    message: 'Year must be a four-digit natural number'
                }
            }
        },

        price: {
            missing: {
                error: {
                    code: '"price" is missing',
                    message: 'Request must contain book price'
                }
            },

            incorrect: {
                error: {
                    code: 'Incorrect price',
                    message: 'Price must be a positive rational number, maximum of two decimal places'
                }
            }
        },

        count: {
            missing: {
                error: {
                    code: 'Count is missing',
                    message: 'Request must contain book copies count in stock'
                }
            },

            incorrect: {
                error: {
                    code: 'Incorrect count',
                    message: 'Count must be a natural number'
                }
            }
        },

        annotation: {
            missing: {
                error: {
                    code: '"annotation" is missing',
                    message: 'Request must contain book annotation'
                }
            },

            incorrect: {
                error: {
                    code: 'Incorrect annotation',
                    message: 'Annotation must be a string with a maximum length of 5000 characters'
                }
            }
        }
    },

    incorrect: {
        page: {
            error: {
                code: 'Incorrect page',
                message: 'Page must be a positive integer'
            }
        }
    }
};
