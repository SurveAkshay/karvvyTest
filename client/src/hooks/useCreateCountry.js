import ajax from '../utils/ajaxHelper';

const useCreateCountry = () => {
    const createCountry = async (data, cb) => {
        let apiFailed = false;
        try {
            const res = await ajax.post(`/country`, data);
            if (!res.data.success) {
                cb(false, res.data.message);
            } else {
                cb(true, res.data.data);
            }
        } catch (error) {
            apiFailed = true;
            console.log('error', error);
        } finally {
            if (apiFailed) cb(false, 'Duplicate Rank and Country Name not allowed');
        }
    };
    return { createCountry };
}

export default useCreateCountry;