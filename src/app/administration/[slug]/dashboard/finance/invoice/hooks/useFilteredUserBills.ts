import dayjs from "dayjs";
import { sort as fastSort } from "fast-sort";
import Fuse from "fuse.js";
import { useQueryState } from "nuqs";

import { useBills } from "@/hooks/query/finance/useBills";
import { useUserBills } from "@/hooks/query/finance/useUserBills";
import { useUsers } from "@/hooks/query/user/useUsers";
import { UserBillWithMoreData } from "@/types/apiTypes";

import { InvoiceQueryKey, UserBillSortKey } from "../utils/types";

export default function useFilteredUserBills() {
  const { data: userBills, isFetching: isFetching2 } = useUserBills();
  const { data: bills, isFetching: isFetching3 } = useBills();
  const { data: users, isFetching: isFetching4 } = useUsers();

  const isFetching = isFetching2 || isFetching3 || isFetching4;

  const userBillsWithMoreData = userBills.map(
    (userBill: UserBillWithMoreData) => {
      const user = users.find((user) => user.id === userBill.user_id);
      const bill = bills.find((bill) => bill.id === userBill.bill_id);
      userBill.user = user;
      userBill.bill = bill;
      return userBill;
    }
  );

  const [sort] = useQueryState(InvoiceQueryKey.sort);
  const [kategori] = useQueryState(InvoiceQueryKey.kategori);
  const [tanggal] = useQueryState(InvoiceQueryKey.tanggal);
  const [cari] = useQueryState(InvoiceQueryKey.cari);

  let filteredUserBills = userBillsWithMoreData.filter((userBill) => {
    function checkKategori() {
      if (!kategori) return true;
      return userBill.bill_id === Number(kategori);
    }
    function checkTanggal() {
      if (!tanggal) return true;

      const [startDate, endDate] = decodeURIComponent(tanggal)
        .split("-")
        .map((tanggal) => dayjs(tanggal, "DD/MM/YYYY"));

      const billDeadline = dayjs(
        userBill.bill?.deadline,
        "DD/MM/YYYY h:mm A Z"
      );
      return (
        billDeadline.isSameOrAfter(startDate, "date") &&
        billDeadline.isSameOrBefore(endDate, "date")
      );
    }

    return checkKategori() && checkTanggal();
  });

  if (cari) {
    const fuse = new Fuse(filteredUserBills, {
      keys: [
        "user.name",
        {
          name: "bill.amount",
          getFn: (userBill) => userBill.bill?.amount.toString(),
        },
      ],
    });
    filteredUserBills = fuse.search(cari).map((data) => data.item);
  }

  if (sort) {
    filteredUserBills = fastSort(filteredUserBills).asc((userBill) => {
      switch (sort as UserBillSortKey) {
        case "id":
          return userBill.id;
        case "deadline":
          // TODO sort as date
          return userBill.bill?.deadline;
        case "name":
          return userBill.user?.name;
        case "category":
          return userBill.bill?.name;
        case "totalPrice":
          return userBill.bill?.amount;
        // TODO add amountPaid
        // case "amountPaid":
        // return userBill.amountPaid
      }
    });
  }

  return { filteredUserBills, isFetching };
}
