import {Flex, Statistic} from "antd";
import CountUp from 'react-countup';

const formatter = (value) => (
  <CountUp end={value} separator=","/>
);

export const Info = () => {
  return (
    <Flex style={{padding: 30, height: '100%'}} vertical gap={15} justify={"center"}>
      <Statistic title="Активных событий" value={23} formatter={formatter}/>
      <Statistic title="Завершенных событий" value={53} formatter={formatter}/>
      <Statistic title="Времени до следующего события" value={52} formatter={formatter}/>
      <Statistic title="Важных событий" value={13} formatter={formatter}/>
    </Flex>
  );
};