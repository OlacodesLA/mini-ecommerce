"use client";

import { onSnapshot } from "firebase/firestore";
import { DocumentData } from "firebase/firestore";
import { salesCollectionRef } from "@/utils";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Admin() {
  const [sales, setSales] = useState<DocumentData[]>([]);
  console.log(sales);
  useEffect(
    () =>
      onSnapshot(salesCollectionRef, (snapshot) =>
        setSales(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-10">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            Admin Christmas Sales
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all christmas web sales
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Phone
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Total Price
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {sales.map((sale) => {
                    const { firstName, lastName, email, phone } =
                      sale.customerInfo;
                    const { status, totalPrice, id } = sale;
                    return (
                      <tr key={id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {firstName} {lastName}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {email}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {phone}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {totalPrice.toLocaleString("en-NG", {
                            style: "currency",
                            currency: "NGN",
                          })}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="text-center font-medium flex ">
                            {status === "cancelled" && (
                              <div className="px-1.5 py.5 bg-red-100 text-red-500 rounded-md">
                                Cancelled
                              </div>
                            )}
                            {(status === "successful" ||
                              status === "completed") && (
                              <div className="px-1.5 py.5 bg-green-100 text-green-500 rounded-md">
                                Successful
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <Link
                            href={`/admin/${id}`}
                            className="text-pink-600 hover:text-pink-900"
                          >
                            View<span className="sr-only">{firstName}</span>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
