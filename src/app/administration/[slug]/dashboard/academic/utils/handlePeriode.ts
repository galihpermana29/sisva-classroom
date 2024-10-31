import AcademicAPI from '@/api/academic';
import dayjs from 'dayjs';
import type { Period, PeriodeInputData } from './types';

function getPeriodId(allPeriod: Period[], name: string) {
  return allPeriod.find((period) => period.name === name).id;
}

export default async function handlePeriode(data: PeriodeInputData) {
  const allPeriod: Period[] = (await AcademicAPI.getAllPeriod()).data.data;
  const periodNames = allPeriod.map((period) => period.name);

  const dataObject = data.map((row) => {
    // see https://stackoverflow.com/questions/16229494/converting-excel-date-serial-number-to-date-using-javascript
    const start_date = new Date(Date.UTC(0, 0, row[1] - 1));
    const end_date = new Date(Date.UTC(0, 0, row[2] - 1));
    return {
      name: row[0],
      start_date: dayjs(start_date).format('DD/MM/YYYY h:mm A Z'),
      end_date: dayjs(end_date).format('DD/MM/YYYY h:mm A Z'),
    };
  });

  const dataCreate = dataObject.filter(
    (period) => !periodNames.includes(period.name)
  );
  const dataUpdate = dataObject.filter((period) =>
    periodNames.includes(period.name)
  );

  const promisesCreate = dataCreate.map((data) => {
    const payload = {
      name: data.name,
      start_time: data.start_date,
      end_time: data.end_date,
    };
    return AcademicAPI.createPeriod(payload);
  });

  const promisesUpdate = dataUpdate.map((data) => {
    const payload = {
      period_id: getPeriodId(allPeriod, data.name),
      period: data.name,
      start_time: data.start_date,
      end_time: data.end_date,
    };
    return AcademicAPI.updatePeriod(payload, getPeriodId(allPeriod, data.name));
  });

  const res = await Promise.all([...promisesCreate, ...promisesUpdate]);
}
