import {Flex, Statistic} from "antd";
import CountUp from 'react-countup';
import {useEffect, useState} from "react";
import {getStatistics} from "@/api/user";
import dayjs from "dayjs";
import {Loader} from "@/components/ui/loader";

const formatter = (value) => (
  <CountUp end={value} separator=","/>
);

export const Info = () => {
  const [statistics, setStatistics] = useState();
  const deadline = Date.now() + 1000 * 60 * 60 * statistics?.hours_left +
    1000 * 60 * statistics?.minutes_left +
    1000 * statistics?.seconds_left;

  const fetchStatistics = async () => {
    const res = await getStatistics({date: dayjs().format("YYYY-MM-DD HH:mm:ss")});
    setStatistics(res.data);
  }

  useEffect(() => {
    fetchStatistics()
  }, []);

  const handleChange = (value) => {
    if (value <= 0) {
      setTimeout(() => fetchStatistics(), 2000);
    }
  }

  return (
    <Flex style={{padding: 30, height: '100%'}} vertical gap={15} justify={"center"}>
      {
        statistics ?
        <>
          <Statistic title="Активных событий" value={statistics.active_events} formatter={formatter}/>
          <Statistic title="Завершенных событий" value={statistics.completed_events} formatter={formatter}/>
            <Statistic.Countdown
              onChange={handleChange}
              value={deadline}
              title="Времени до следующего события"
            />
          <Statistic title="Важных событий" value={statistics.important_events} formatter={formatter}/>
        </> :
        <Loader />
      }
    </Flex>
  );
};