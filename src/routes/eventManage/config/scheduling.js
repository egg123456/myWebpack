export const  memberStructure = [{
  title: '项目采购',
  value: '0-0',
  key: '0-0',
  children: [
    {
      title: '项目中心',
      value: '0-0-1',
      key: '0-0-1',
      children: [
        {
          title: '江墨',
          value: '0-0-1-1',
          key: '0-0-1-1',
        }, 
        {
          title: 'egg',
          value: '0-0-1-2',
          key: '0-0-1-2',
        },
        {
          title: '平平',
          value: '0-0-1-3',
          key: '0-0-1-3',
        }, 
        {
          title: '方盖',
          value: '0-0-1-4',
          key: '0-0-1-4',
        }
      ],
    }, 
    {
      title: '招标中心',
      value: '0-0-2',
      key: '0-0-2',
      children: [
        {
          title: '蓝蜀',
          value: '0-0-2-1',
          key: '0-0-2-1',
        }, 
      ],
    },
    {
      title: '毅轩',
      value: '0-0-0',
      key: '0-0-0',
    }
  ],
}];

export const getCurrBranchMember = (key) => {
  if (!key) return undefined;
  let curr = undefined;
  const recusion = (arr) => {
    arr.some(el => {
      if (curr) return true;
      if (el.key === key) {
        curr = el;
        return true;
      }
      if (el.children?.length) {
        recusion(el.children)
      }
    });
  }
  recusion(memberStructure);

  let names = [];
  const getNames = (data) => {
    data.forEach(el => {
      if (el?.children?.length) {
        getNames(el.children);
      } else {
        names.push(el?.title);
      }
    });
  }

  getNames([curr]);

  return names;
}