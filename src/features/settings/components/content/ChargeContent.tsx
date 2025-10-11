import { getCharges } from '@/supabase/data/charges-service';
import ChargeCardEmpty from '../card/ChargeCardEmpty';
import ChargeListCard from '../card/ChargeListCard';

async function ChargeContent() {
  const { data: charges, error } = await getCharges();
  // ---> TODO: MUST CHANGE <---
  if (error || !charges) return <p>ERROR!!!</p>;

  if (charges.length === 0) return <ChargeCardEmpty />;

  return <ChargeListCard charges={charges} />;
}

export default ChargeContent;
