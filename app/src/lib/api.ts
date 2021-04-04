import dayjs from "dayjs";
import useSWR from "swr";
const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
const houseId = process.env.NEXT_PUBLIC_API_HOUSE_ID;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export const getMembersWithSWR = () => {
  async function fetcher(url) {
    return getMembers();
  }
  return useSWR("member", fetcher).data || [];
};

export const getMembers = async () => {
  try {
    const response = await fetch(endpoint + "/member/" + houseId, {
      headers: {
        "x-api-key": apiKey,
      },
    });
    // return response.json()

    const data = await response.json();

    return data.map((member) => {
      return {
        id: member.Name,
        name: `${member.Room} - ${member.Name}`,
      };
    });
  } catch (e) {
    alert(e.message);
  }
};

export const postPurchaseItems = async (memberId, items) => {
  try {
    const postData = items.map((item, index) => {
      return {
        Timestamp: dayjs().add(index, "second").format("YYYY/MM/DD HH:mm:ss"),
        Tenant: memberId,
        Item: item.name,
        Price: item.price,
        Quantity: item.quantity,
        TotalPrice: item.price * item.quantity,
      };
    });

    console.log(postData);

    const response = await fetch(endpoint + "/purchase/" + houseId, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify(postData),
    });
    return await response.json();
  } catch (e) {
    alert(e.message);
  }
};
