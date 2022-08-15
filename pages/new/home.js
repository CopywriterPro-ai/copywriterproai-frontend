// import { useRef } from "react";
// import styled from "styled-components";

// import Layout from "@/layout/NewLayout";
// import { useEventListener } from "@/hooks";

// const Home = () => {
//   const testRef = useRef(null);

//   const scrolling = () => {
//     if (testRef) {
//       if (window.pageYOffset > testRef.current.offsetTop) {
//         console.log("Sticky add koren");
//       } else {
//         console.log("Sticky remove koren");
//       }
//     }
//   };

//   useEventListener("scroll", scrolling);

//   return (
//     <Layout>
//       <Container>
//         <div>
//           <p>
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor odio
//             quos ratione quia mollitia, nesciunt autem, commodi dolore porro
//             enim nam itaque aliquam repellendus unde, ex adipisci? Similique
//             doloribus et architecto minus mollitia amet alias inventore
//             reiciendis. Quos quis reiciendis beatae voluptate, voluptatum sit
//             est minima culpa deleniti nesciunt itaque commodi neque laboriosam
//             optio voluptas nihil, totam natus accusamus non quibusdam sint
//             ratione maxime. Consectetur assumenda illum dicta nesciunt alias
//             quisquam odit, beatae, neque sequi delectus, non in deserunt hic
//             quas sint voluptas. Deleniti facilis blanditiis distinctio sit ab
//             numquam ad, dignissimos quibusdam eum placeat quidem assumenda harum
//             laboriosam repellat labore sint praesentium officiis dicta
//             similique, earum vel quam illum voluptatem. At praesentium officia
//             consequuntur eveniet quasi quisquam modi beatae sequi fugiat atque
//             perferendis impedit aliquid est, dolore necessitatibus voluptate.
//             Cupiditate qui quo dignissimos? A rem maiores sed facere eligendi
//             repellendus animi itaque tenetur fugiat, eum corrupti et error
//             aspernatur vitae voluptate tempora explicabo sint enim fuga dolorem
//             quod. Fugiat possimus ducimus dolorum magni repellat deleniti vitae
//             repellendus reiciendis eos sint corrupti ipsa eveniet, temporibus
//             rem. Debitis porro fugit id possimus velit voluptatum laborum
//             commodi nulla unde tenetur, sequi sunt aut mollitia optio
//             accusantium officiis dolorum hic dolor voluptatem vitae iusto saepe
//             consectetur omnis. Modi doloremque ullam quisquam enim quas eligendi
//             illum dolorum officia veritatis. Impedit, dolores neque qui
//             necessitatibus magnam alias! Dicta voluptatibus voluptas facere
//             totam. Maxime quidem asperiores consequatur et voluptates ex alias
//             eligendi officiis dicta autem minima quaerat iure, eius ducimus
//             adipisci voluptate inventore. Corrupti, illum voluptatum. Illum,
//             perspiciatis! In earum atque facere, corporis eos quos sequi ipsam
//             temporibus officiis perferendis sunt impedit totam, ut adipisci.
//             Excepturi quisquam optio, eveniet explicabo, accusantium itaque
//             voluptatum eum assumenda ad debitis fugit. Sint inventore dolore
//             voluptatem cupiditate quos! Voluptate repudiandae nemo, quos quia
//             exercitationem eius quasi, dignissimos magnam dolorum cum architecto
//             harum error a ex ipsam facere velit itaque veniam delectus? Dolorem,
//             deserunt reprehenderit officiis eos ipsam corporis suscipit sit
//             placeat repellendus. Cumque corrupti aperiam consectetur ea nesciunt
//             natus dolores vel est cupiditate eaque necessitatibus eligendi
//             possimus mollitia minima optio alias explicabo quisquam
//             reprehenderit et dolorem, dicta animi non pariatur cum! Facilis
//             ipsum sequi dicta minima, inventore autem voluptatibus placeat eaque
//             debitis perferendis incidunt excepturi, libero, ratione beatae
//             voluptatum ab blanditiis quis unde? Qui ullam nam dolor fugit autem
//             repellendus quae sint voluptas et atque reprehenderit quasi harum
//             doloremque natus, voluptatibus eveniet! Eveniet qui fugit similique
//             beatae iure ducimus dolorum, aspernatur, autem quos deserunt minus
//             dolore dicta at ipsa? Praesentium ipsum exercitationem dolore iste
//             esse accusamus aperiam reiciendis suscipit odit molestiae dolor quae
//             cupiditate error modi est, qui molestias quibusdam, eaque quod
//             inventore laudantium maiores. Quibusdam, odit quas doloremque rem
//             debitis esse. Et recusandae mollitia dignissimos explicabo facere!
//             Eum corrupti assumenda cumque, corporis expedita ad accusantium quam
//             earum tempora velit eos enim vero quisquam esse sapiente dolorem qui
//             consequatur non totam molestiae tenetur quia? A nostrum, excepturi
//             rerum velit minima dicta eum amet cum, minus blanditiis doloribus
//             quam nam necessitatibus fuga quas deserunt magni provident in
//             quibusdam. Vitae, laborum optio.
//           </p>
//           <div
//             ref={testRef}
//             style={{
//               background: "skyblue",
//               color: "white",
//               textAlign: "center",
//             }}
//           >
//             TEST
//           </div>
//           <p>
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
//             ut voluptatem optio voluptate qui officiis itaque repudiandae neque
//             tempora. Recusandae, quam est. Illum, itaque? Ratione, repellat
//             nulla porro laudantium, numquam inventore optio distinctio minima
//             perspiciatis, sapiente incidunt! Id at esse atque cupiditate placeat
//             asperiores quia totam vel veritatis numquam repellat aut ut nam eum
//             accusantium, maiores autem nobis facilis natus beatae provident.
//             Delectus enim quasi, at quam illum dignissimos omnis iure nulla modi
//             dolore fugit! Distinctio, hic quisquam dolorem mollitia modi aut.
//             Ullam reprehenderit voluptatibus dicta sed non exercitationem
//             doloribus quasi animi et excepturi! Fugiat dolor nemo expedita
//             maiores! Non enim possimus quidem molestias cum ea facilis dolorem
//             provident officiis delectus, corrupti vero, sequi voluptatibus,
//             exercitationem suscipit esse itaque corporis pariatur alias
//             recusandae iure saepe adipisci expedita quibusdam! Itaque ratione,
//             natus placeat assumenda qui sunt, facilis hic laborum repellendus
//             magnam nihil velit iure maiores ex animi? Modi necessitatibus
//             deleniti magnam ratione, ea perferendis tempore! Amet porro debitis
//             provident velit unde deserunt quae iste tempore sunt aut illum ad
//             alias animi, odio facilis. Asperiores, corporis! Neque,
//             necessitatibus. Voluptate illo corrupti quidem. Accusamus, quod?
//             Nemo voluptatem ea aliquid laudantium dolores vitae itaque tenetur
//             odio nihil, esse saepe, consectetur eligendi excepturi molestiae
//             dolore quos nobis similique perspiciatis accusamus dicta? Maiores
//             dolorum cumque voluptate eligendi. Autem sequi corporis nam omnis.
//             Accusamus deserunt totam corporis consequatur voluptatum nostrum
//             ipsum cumque unde culpa illo amet dolorem quia ullam qui aliquam et,
//             sed magnam recusandae esse natus saepe quod ipsa. Inventore,
//             voluptatibus provident. Possimus recusandae, molestiae voluptas eius
//             nisi ad id, consequatur aspernatur est adipisci assumenda obcaecati
//             architecto quisquam accusamus aut vel corrupti saepe cumque esse
//             quod officia blanditiis hic ab repellendus? Alias veritatis labore
//             enim inventore, eaque expedita nisi officia, architecto ut illum
//             sapiente, quisquam rerum quod laboriosam modi accusamus est! Commodi
//             exercitationem praesentium, consectetur corrupti molestiae nemo
//             obcaecati vel quibusdam eligendi sint tempora! Assumenda itaque
//             dignissimos quaerat aspernatur corporis vero veniam, quidem sapiente
//             facere voluptatum iste error perferendis praesentium mollitia
//             blanditiis odit non eum nemo maiores laboriosam velit provident
//             aliquam harum voluptatem! Est sint velit molestias unde inventore
//             quo, earum laborum commodi at magni facere aliquid distinctio neque
//             accusamus alias eligendi labore provident. Delectus, ea esse fugit
//             autem at eius molestiae repellat molestias maxime ipsa accusantium
//             explicabo voluptatem, ad rem nisi ex laborum dicta debitis quas. Vel
//             incidunt hic natus dolorum quod cum ipsam ea! Amet nesciunt rerum
//             illo odit itaque commodi culpa rem id.
//           </p>
//         </div>
//       </Container>
//     </Layout>
//   );
// };

// const Container = styled.div`
//   margin: 0 auto;
//   max-width: 1450px;
//   padding-left: 1rem;
//   padding-right: 1rem;
// `;

// export default Home;
