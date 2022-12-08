import instance from './instance';

const services = {
  getData: (url) => instance.get(url).then((data) => data.data),

  addData: (url, object) => instance.post(url, object),

  editData: (url, id, object) => instance.patch(`/${url}/${id}`, object),

  deleteData: (url, id) => instance.delete(`/${url}/${id}`),
};

export default services;
