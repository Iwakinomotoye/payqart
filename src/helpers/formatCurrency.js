const formatCurrency = (value) => {
    return new Intl.NumberFormat().format(value);
}

export default formatCurrency;