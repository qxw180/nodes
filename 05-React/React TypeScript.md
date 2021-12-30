# TypeScript With React

```TypeScript
import React from 'react';
interface IHelloProps {
  name: string;
}
const Hello: React.FC<IHelloProps> = ({name, children}) => {
  return (
    <>
      <p>hello {name}</p>
      { children }
    </>
  )
}
export default Hello;
```

## 获取未导出类型定义的组件属性定义

```TypeScript
import { Select } from 'antd';
type SelectProps = React.ComponentProps<typeof Select>


```

## Antd Select 组件二次封装，支持现有全部属性

```TSX
import React, { useState } from 'react';
import { Select } from 'antd';

import type { SelectProps, SelectValue } from 'antd/lib/select';

const { Option } = Select;

interface IOptionSelectProps {
  type?: IOptionKey;
  data?: IOptionValue[];
}

/**
 * @description 对Antd Select 组件二次封装，支持使用自定义选项数据和选项接口数据，默认支持输入过滤
 * @param type 可选，数据类型，可选属性为配置项接口KEY值
 * @param data 可选，自定义可选项数据、格式为 IOptionValue[]，data比type有更高优先级
 */
const OptionSelect: <T extends SelectValue>(props: IOptionSelectProps & SelectProps<T>) => JSX.Element = ({
  type,
  data,
  onBlur,
  ...opts
}) => {
  const dataArr = Array.isArray(data) ? data: [];

  const [filterText, setFilterText] = useState('');
  const handleSearch = (value: string) => {
    setFilterText(value);
  };

  /**
   * 失去焦点时重置选项过滤
   */
  const handelBlur: React.FocusEventHandler<HTMLElement> = (e) => {
    setFilterText('');
    onBlur?.(e);
  };

  return (
    <Select
      showSearch
      allowClear
      filterOption={false}
      onSearch={debounce(handleSearch, 300)}
      onBlur={handelBlur}
      {...opts}
    >
      {dataArr
        ?.filter(({ item }) => {
          if (!item) return true;
          return item.includes(filterText);
        })
        .map(({ id, item }) => {
          return (
            <Option key={id} value={id}>
              {item}
            </Option>
          );
        })}
    </Select>
  );
};

export default OptionSelect;
```

## 参考

[TypeScript React Starter](https://github.com/Microsoft/TypeScript-React-Starter#typescript-react-starter)
