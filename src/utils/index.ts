/**
 * 导出
 */
export const download = (res: any) => {
  if (!res) {
    return;
  }
  const { data, headers } = res;
  const fileName = headers['content-disposition'].replace(
    /\w+;filename=(.*)/,
    '$1'
  );
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement('a');
  link.style.display = 'none';
  link.href = url;
  link.setAttribute('download', decodeURI(fileName));
  document.body.appendChild(link);
  link.click();
};
