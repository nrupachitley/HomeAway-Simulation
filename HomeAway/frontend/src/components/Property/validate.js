const validate = values => {
    const errors = {}
    if (!values.address) {
        errors.address = 'Required'
    }
    if (!values.city) {
        errors.city = 'Required'
    }
    if (!values.state) {
        errors.state = 'Required'
    }
    if (!values.zip_code) {
        errors.zip_code = 'Required'
    }
    if (!values.headline) {
        errors.headline = 'Required'
    }
    if (!values.bedroom) {
        errors.bedroom = 'Required'
    }
    if (!values.bathroom) {
        errors.bathroom = 'Required'
    }
    if (!values.accomodates) {
        errors.accomodates = 'Required'
    }
    if (!values.booking_type) {
        errors.booking_type = 'Required to select either of one options'
    }
    if (!values.price) {
        errors.price = 'Required'
    }
    if (!values.pricetoggle) {
        errors.pricetoggle = 'Required'
    }
    if (!values.property_images) {
        errors.property_images = 'Required'
    }
    return errors
}

export default validate