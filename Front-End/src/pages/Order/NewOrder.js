import React, { useState } from "react";
import { Box, Button, TextField, MenuItem, Typography } from "@mui/material";
import PageMain from "../../components/PageMain";
import { ref, push } from "firebase/database"; // Adjust the path as necessary
import { projectFirestore } from "../../components/firebase-config";
import { Link, useNavigate } from "react-router-dom";

const enduseOptions = [
  { value: "Metallic Print T-shirt", label: "Metallic Print T-shirt" },
  { value: "Acid Wash T-shirt", label: "Acid Wash T-shirt" },
  { value: "Active wear", label: "Active wear" },
  { value: "Activewear", label: "Activewear" },
  { value: "Animal Print T-shirt", label: "Animal Print T-shirt" },
  { value: "Anti-Odor T-shirt", label: "Anti-Odor T-shirt" },
  { value: "Asymmetric Hem T-shirt", label: "Asymmetric Hem T-shirt" },
  { value: "Athletic Fit T-shirt", label: "Athletic Fit T-shirt" },
  { value: "Bamboo T-shirt", label: "Bamboo T-shirt" },
  { value: "Baseball Tee", label: "Baseball Tee" },
  { value: "Bathimg suits", label: "Bathimg suits" },
  { value: "Beach Cover-ups", label: "Beach Cover-ups" },
  { value: "Bloouses", label: "Bloouses" },
  { value: "Blouses", label: "Blouses" },
  { value: "Boat Neck T-shirt", label: "Boat Neck T-shirt" },
  { value: "Box Cut T-shirt", label: "Box Cut T-shirt" },
  { value: "Bras", label: "Bras" },
  { value: "Burnout Knit T-shirt", label: "Burnout Knit T-shirt" },
  { value: "Burnout T-shirt", label: "Burnout T-shirt" },
  { value: "Button Front T-shirt", label: "Button Front T-shirt" },
  { value: "Camouflage T-shirt", label: "Camouflage T-shirt" },
  { value: "Cardigans", label: "Cardigans" },
  { value: "Classic Crew Neck T-shirt", label: "Classic Crew Neck T-shirt" },
  { value: "Coats", label: "Coats" },
  { value: "Cold Shoulder T-shirt", label: "Cold Shoulder T-shirt" },
  { value: "Compression T-shirt", label: "Compression T-shirt" },
  { value: "Corset T-shirt", label: "Corset T-shirt" },
  { value: "Coveralls", label: "Coveralls" },
  { value: "Crop Top", label: "Crop Top" },
  { value: "Cropped High-Low T-shirt", label: "Cropped High-Low T-shirt" },
  { value: "Cutout T-shirt", label: "Cutout T-shirt" },
  { value: "Deep V-neck T-shirt", label: "Deep V-neck T-shirt" },
  { value: "Dip Dye T-shirt", label: "Dip Dye T-shirt" },
  { value: "Dressers", label: "Dressers" },
  { value: "Dresses", label: "Dresses" },
  { value: "Egyptian Cotton T-shirt", label: "Egyptian Cotton T-shirt" },
  { value: "Elastane T-shirt", label: "Elastane T-shirt" },
  { value: "Embroidered T-shirt", label: "Embroidered T-shirt" },
  { value: "Fitted T-shirt", label: "Fitted T-shirt" },
  { value: "Floral Print T-shirt", label: "Floral Print T-shirt" },
  { value: "Foil Print T-shirt", label: "Foil Print T-shirt" },
  { value: "French Terry T-shirt", label: "French Terry T-shirt" },
  { value: "Graphic T-shirt", label: "Graphic T-shirt" },
  { value: "Hemp T-shirt", label: "Hemp T-shirt" },
  { value: "Henley T-shirt", label: "Henley T-shirt" },
  { value: "High Neck T-shirt", label: "High Neck T-shirt" },
  { value: "High-Low T-shirt", label: "High-Low T-shirt" },
  { value: "Jackets", label: "Jackets" },
  { value: "Jeans", label: "Jeans" },
  { value: "Jersey Knit T-shirt", label: "Jersey Knit T-shirt" },
  { value: "Keyhole Front T-shirt", label: "Keyhole Front T-shirt" },
  { value: "Knot Front T-shirt", label: "Knot Front T-shirt" },
  { value: "Lace Trim T-shirt", label: "Lace Trim T-shirt" },
  { value: "Lace-Up T-shirt", label: "Lace-Up T-shirt" },
  { value: "Layered Hem T-shirt", label: "Layered Hem T-shirt" },
  { value: "Long Sleeve T-shirt", label: "Long Sleeve T-shirt" },
  { value: "Long-sleeved T-shirt", label: "Long-sleeved T-shirt" },
  { value: "Lycra T-shirt", label: "Lycra T-shirt" },
  { value: "Lyocell T-shirt", label: "Lyocell T-shirt" },
  { value: "Merino Wool T-shirt", label: "Merino Wool T-shirt" },
  { value: "Mesh Panel T-shirt", label: "Mesh Panel T-shirt" },
  { value: "Modal T-shirt", label: "Modal T-shirt" },
  { value: "Moisture-Wicking T-shirt", label: "Moisture-Wicking T-shirt" },
  { value: "Muscle Tee", label: "Muscle Tee" },
  { value: "Off-the-Shoulder T-shirt", label: "Off-the-Shoulder T-shirt" },
  { value: "Ombre T-shirt", label: "Ombre T-shirt" },
  { value: "Organic Cotton T-shirt", label: "Organic Cotton T-shirt" },
  { value: "Outwear", label: "Outwear" },
  { value: "Overalls", label: "Overalls" },
  { value: "Oversized T-shirt", label: "Oversized T-shirt" },
  { value: "Panties", label: "Panties" },
  { value: "Pants", label: "Pants" },
  { value: "Patchwork T-shirt", label: "Patchwork T-shirt" },
  { value: "Peplum T-shirt", label: "Peplum T-shirt" },
  { value: "Performance T-shirt", label: "Performance T-shirt" },
  { value: "Pima Cotton T-shirt", label: "Pima Cotton T-shirt" },
  { value: "Pique T-shirt", label: "Pique T-shirt" },
  { value: "Plain Crew Neck T-shirt", label: "Plain Crew Neck T-shirt" },
  { value: "Pocket T-shirt", label: "Pocket T-shirt" },
  { value: "Polka Dot T-shirt", label: "Polka Dot T-shirt" },
  { value: "Raglan Sleeve T-shirt", label: "Raglan Sleeve T-shirt" },
  { value: "Raincoats", label: "Raincoats" },
  { value: "Recycled Polyester T-shirt", label: "Recycled Polyester T-shirt" },
  { value: "Relaxed Fit T-shirt", label: "Relaxed Fit T-shirt" },
  {
    value: "Rhinestone Embellished T-shirt",
    label: "Rhinestone Embellished T-shirt",
  },
  { value: "Ribbed Knit T-shirt", label: "Ribbed Knit T-shirt" },
  { value: "Ringer T-shirt", label: "Ringer T-shirt" },
  { value: "Robes", label: "Robes" },
  { value: "Scoop Neck T-shirt", label: "Scoop Neck T-shirt" },
  { value: "Sequin T-shirt", label: "Sequin T-shirt" },
  { value: "Shirts", label: "Shirts" },
  { value: "Shorts", label: "Shorts" },
  { value: "Skirts", label: "Skirts" },
  { value: "Sleeveless T-shirt", label: "Sleeveless T-shirt" },
  { value: "Slim Fit T-shirt", label: "Slim Fit T-shirt" },
  { value: "Slit Hem T-shirt", label: "Slit Hem T-shirt" },
  { value: "Slub Knit T-shirt", label: "Slub Knit T-shirt" },
  { value: "Spandex T-shirt", label: "Spandex T-shirt" },
  { value: "Striped T-shirt", label: "Striped T-shirt" },
  { value: "Suiting", label: "Suiting" },
  { value: "Supima Cotton T-shirt", label: "Supima Cotton T-shirt" },
  { value: "Sweater vests", label: "Sweater vests" },
  { value: "Sweaters", label: "Sweaters" },
  { value: "Swim trunks", label: "Swim trunks" },
  { value: "Swim wear", label: "Swim wear" },
  { value: "T-shirt", label: "T-shirt" },
  { value: "Tail Hem T-shirt", label: "Tail Hem T-shirt" },
  { value: "Tank Top", label: "Tank Top" },
  { value: "Thermal T-shirt", label: "Thermal T-shirt" },
  { value: "Tie Front T-shirt", label: "Tie Front T-shirt" },
  { value: "Tie-dye T-shirt", label: "Tie-dye T-shirt" },
  { value: "Tops", label: "Tops" },
  { value: "Trench coats", label: "Trench coats" },
  { value: "Trousers", label: "Trousers" },
  { value: "Turtle Neck T-shirt", label: "Turtle Neck T-shirt" },
  { value: "Twist Front T-shirt", label: "Twist Front T-shirt" },
  { value: "UV Protection T-shirt", label: "UV Protection T-shirt" },
  { value: "Vests", label: "Vests" },
  { value: "Vintage Wash T-shirt", label: "Vintage Wash T-shirt" },
  { value: "V-neck T-shirt", label: "V-neck T-shirt" },
  { value: "Waffle Knit T-shirt", label: "Waffle Knit T-shirt" },
  { value: "Wrap Front T-shirt", label: "Wrap Front T-shirt" },
  { value: "Zip Front T-shirt", label: "Zip Front T-shirt" },
];

const fabricMethodOptions = [
  { value: "SINGLE_BLEND", label: "Single Blend" },
  { value: "TWO_FABRIC_BLEND", label: "Two Fabric Blend" },
  { value: "TRI_BLEND", label: "Tri-Blend" },
];

const fabricOptions = [
  { value: "Slub Knit", label: "Slub Knit" },
  { value: "100% Cotton", label: "100% Cotton" },
  { value: "100% silk", label: "100% Silk" },
  { value: "100% wool", label: "100% Wool" },
  { value: "Acetate", label: "Acetate" },
  { value: "Acid Washed", label: "Acid Washed" },
  { value: "Acid-washed Fabrics", label: "Acid-Washed Fabrics" },
  { value: "Acrylic", label: "Acrylic" },
  { value: "Alpaca", label: "Alpaca" },
  { value: "Angora", label: "Angora" },
  { value: "Animal Printed", label: "Animal Printed" },
  { value: "Anti-Odor Fabric", label: "Anti-Odor Fabric" },
  { value: "Asymmetric Hem Fabric", label: "Asymmetric Hem Fabric" },
  { value: "Athletic Fit Fabric", label: "Athletic Fit Fabric" },
  { value: "Bamboo", label: "Bamboo" },
  { value: "Bamboo blend", label: "Bamboo Blend" },
  { value: "Bamboo Fabric", label: "Bamboo Fabric" },
  { value: "Bamboo jersey", label: "Bamboo Jersey" },
  { value: "Batiste", label: "Batiste" },
  { value: "Beaded Fabrics", label: "Beaded Fabrics" },
  { value: "Box Cut Fabric", label: "Box Cut Fabric" },
  { value: "Brocade", label: "Brocade" },
  { value: "Burlap", label: "Burlap" },
  { value: "Burnout", label: "Burnout" },
  { value: "Burnout Knit Fabric", label: "Burnout Knit Fabric" },
  { value: "Button Front Fabric", label: "Button Front Fabric" },
  { value: "Camel", label: "Camel" },
  { value: "Camouflage Fabric", label: "Camouflage Fabric" },
  { value: "Cashmere", label: "Cashmere" },
  { value: "Chambray", label: "Chambray" },
  { value: "Charmeuse", label: "Charmeuse" },
  { value: "Chenille", label: "Chenille" },
  { value: "Chiffon", label: "Chiffon" },
  { value: "Coated Fabrics", label: "Coated Fabrics" },
  { value: "Cold Shoulder Fabric", label: "Cold Shoulder Fabric" },
  { value: "Compression Fabric", label: "Compression Fabric" },
  { value: "Corduroy", label: "Corduroy" },
  { value: "Corset Fabric", label: "Corset Fabric" },
  { value: "Cotton", label: "Cotton" },
  { value: "Cotton Blend", label: "Cotton Blend" },
  { value: "Cotton/spandex", label: "Cotton/Spandex" },
  { value: "Cotton-Poly Blend", label: "Cotton-Poly Blend" },
  { value: "Crepe", label: "Crepe" },
  { value: "Crepe de Chine", label: "Crepe de Chine" },
  { value: "Crinkle Fabrics", label: "Crinkle Fabrics" },
  {
    value: "Cropped High-Low Hem Fabric",
    label: "Cropped High-Low Hem Fabric",
  },
  { value: "Cupro", label: "Cupro" },
  { value: "Cupro blend", label: "Cupro Blend" },
  { value: "Cupro jersey", label: "Cupro Jersey" },
  { value: "Cutout Fabric", label: "Cutout Fabric" },
  { value: "CV linen blends", label: "CV Linen Blends" },
  { value: "CV silk blends", label: "CV Silk Blends" },
  { value: "CV wool blends", label: "CV Wool Blends" },
  { value: "CVC and Spandex blends", label: "CVC and Spandex Blends" },
  { value: "CVC blends", label: "CVC Blends" },
  { value: "CVS", label: "CVS" },
  { value: "Damask", label: "Damask" },
  { value: "Denim", label: "Denim" },
  { value: "Dip Dyed", label: "Dip Dyed" },
  { value: "Dobby", label: "Dobby" },
  { value: "Dupioni silk", label: "Dupioni Silk" },
  { value: "Egyptian Cotton", label: "Egyptian Cotton" },
  { value: "Egyptian Cotton Fabric", label: "Egyptian Cotton Fabric" },
  { value: "Elastane", label: "Elastane" },
  { value: "Elastane Fabric", label: "Elastane Fabric" },
  { value: "Embossed Fabrics", label: "Embossed Fabrics" },
  { value: "Embroidered Fabric", label: "Embroidered Fabric" },
  { value: "Embroidered Fabrics", label: "Embroidered Fabrics" },
  { value: "Faux fur", label: "Faux Fur" },
  { value: "Faux leather", label: "Faux Leather" },
  { value: "Fitted Fabric", label: "Fitted Fabric" },
  { value: "Flannel", label: "Flannel" },
  { value: "Flax", label: "Flax" },
  { value: "Flax jersey", label: "Flax Jersey" },
  { value: "Fleece", label: "Fleece" },
  { value: "Floral Printed", label: "Floral Printed" },
  { value: "Foil Printed", label: "Foil Printed" },
  { value: "Foiled Fabrics", label: "Foiled Fabrics" },
  { value: "French Terry", label: "French Terry" },
  { value: "French Terry Fabric", label: "French Terry Fabric" },
  { value: "Fustian", label: "Fustian" },
  { value: "Gabardine", label: "Gabardine" },
  { value: "Gauze", label: "Gauze" },
  { value: "Georgette", label: "Georgette" },
  { value: "Habotai silk", label: "Habotai Silk" },
  { value: "Heathered fabrics", label: "Heathered Fabrics" },
  { value: "Hemp", label: "Hemp" },
  { value: "Hemp Fabric", label: "Hemp Fabric" },
  { value: "Herringbone", label: "Herringbone" },
  { value: "High-Low Hem Fabric", label: "High-Low Hem Fabric" },
  { value: "Houndstooth", label: "Houndstooth" },
  { value: "Ikat Fabrics", label: "Ikat Fabrics" },
  { value: "Interlock Knit", label: "Interlock Knit" },
  { value: "Jacquard", label: "Jacquard" },
  { value: "Jacquard jersey", label: "Jacquard Jersey" },
  { value: "Jacquard Knit", label: "Jacquard Knit" },
  { value: "Jersey Knit", label: "Jersey Knit" },
  { value: "Jersey Knit Fabric", label: "Jersey Knit Fabric" },
  { value: "Jute", label: "Jute" },
  { value: "Keyhole Front Fabric", label: "Keyhole Front Fabric" },
  { value: "Knot Front Fabric", label: "Knot Front Fabric" },
  { value: "Lace Trimmed Fabric", label: "Lace Trimmed Fabric" },
  { value: "Lace-Up Fabric", label: "Lace-Up Fabric" },
  { value: "Laminated Fabrics", label: "Laminated Fabrics" },
  { value: "Lawn", label: "Lawn" },
  { value: "Layered Hem Fabric", label: "Layered Hem Fabric" },
  { value: "Leather", label: "Leather" },
  { value: "Linen", label: "Linen" },
  { value: "Linen Jersey", label: "Linen Jersey" },
  { value: "Lurex", label: "Lurex" },
  { value: "Lycra", label: "Lycra" },
  { value: "Lycra Fabric", label: "Lycra Fabric" },
  { value: "Lyocell", label: "Lyocell" },
  { value: "Lyocell Fabric", label: "Lyocell Fabric" },
  { value: "Marled fabrics", label: "Marled Fabrics" },
  { value: "Melange fabrics", label: "Melange Fabrics" },
  { value: "Merino Wool", label: "Merino Wool" },
  { value: "Merino Wool Fabric", label: "Merino Wool Fabric" },
  { value: "Mesh", label: "Mesh" },
  { value: "Mesh Panel Fabric", label: "Mesh Panel Fabric" },
  { value: "Metallic Fabrics", label: "Metallic Fabrics" },
  { value: "Metallic Knits", label: "Metallic Knits" },
  { value: "Metallic Printed", label: "Metallic Printed" },
  { value: "Microfiber", label: "Microfiber" },
  { value: "Milk blend", label: "Milk Blend" },
  { value: "Milk jersey", label: "Milk Jersey" },
  { value: "Modal", label: "Modal" },
  { value: "Modal blend", label: "Modal Blend" },
  { value: "Modal Fabric", label: "Modal Fabric" },
  { value: "Modal jersey", label: "Modal Jersey" },
  { value: "Mohair", label: "Mohair" },
  { value: "Moisture-Wicking Fabric", label: "Moisture-Wicking Fabric" },
  { value: "Moleskin", label: "Moleskin" },
  { value: "Muslin", label: "Muslin" },
  { value: "Neoprene", label: "Neoprene" },
  { value: "Nylon", label: "Nylon" },
  {
    value: "Nylon and Polyster Microforbes",
    label: "Nylon and Polyester Microfibers",
  },
  { value: "Nylon Blend", label: "Nylon Blend" },
  { value: "Nylon Mesh", label: "Nylon Mesh" },
  { value: "Nyon", label: "Nyon" },
  { value: "Ombre Dyed", label: "Ombre Dyed" },
  { value: "Ombre Fabrics", label: "Ombre Fabrics" },
  { value: "Organic Cotton", label: "Organic Cotton" },
  { value: "Organic Cotton Blend", label: "Organic Cotton Blend" },
  { value: "Organic Cotton Fabric", label: "Organic Cotton Fabric" },
  { value: "Organza", label: "Organza" },
  { value: "Oversized Fit Fabric", label: "Oversized Fit Fabric" },
  { value: "Oxford", label: "Oxford" },
  { value: "Paper Fabric", label: "Paper Fabric" },
  { value: "Patchwork Fabric", label: "Patchwork Fabric" },
  { value: "Peplum Fabric", label: "Peplum Fabric" },
  { value: "Performance Fabric", label: "Performance Fabric" },
  { value: "Pima Cotton", label: "Pima Cotton" },
  { value: "Pima Cotton Fabric", label: "Pima Cotton Fabric" },
  { value: "Pique", label: "Pique" },
  { value: "Pique Fabric", label: "Pique Fabric" },
  { value: "Pique Knit", label: "Pique Knit" },
  { value: "Polar Fleece", label: "Polar Fleece" },
  { value: "Polyester", label: "Polyester" },
  { value: "Polyester blend", label: "Polyester Blend" },
  { value: "Polyester jersey", label: "Polyester Jersey" },
  { value: "Polyester/Spandex", label: "Polyester/Spandex" },
  { value: "polyster", label: "Polyster" },
  { value: "Poplin", label: "Poplin" },
  { value: "Predominantly Acrylic", label: "Predominantly Acrylic" },
  { value: "Predominantly Cotton", label: "Predominantly Cotton" },
  { value: "Printed Fabrics", label: "Printed Fabrics" },
  { value: "Printed Knit", label: "Printed Knit" },
  { value: "PU", label: "PU" },
  { value: "PUL", label: "PUL" },
  { value: "PVC", label: "PVC" },
  { value: "Quilted Fabrics", label: "Quilted Fabrics" },
  { value: "Raglan Knit", label: "Raglan Knit" },
  { value: "Raime", label: "Raime" },
  { value: "Ramie", label: "Ramie" },
  { value: "Rayon", label: "Rayon" },
  { value: "Rayon/Spandex", label: "Rayon/Spandex" },
  { value: "Recycled blend", label: "Recycled Blend" },
  { value: "Recycled cotton", label: "Recycled Cotton" },
  { value: "Recycled Polyester", label: "Recycled Polyester" },
  { value: "Recycled Polyester Fabric", label: "Recycled Polyester Fabric" },
  { value: "Relaxed Fit Fabric", label: "Relaxed Fit Fabric" },
  {
    value: "Rhinestone Embellished Fabric",
    label: "Rhinestone Embellished Fabric",
  },
  { value: "Ribbed Knit", label: "Ribbed Knit" },
  { value: "Ribbed Knit Fabric", label: "Ribbed Knit Fabric" },
  { value: "Ripstop Cotton", label: "Ripstop Cotton" },
  { value: "Ripstop Nylon", label: "Ripstop Nylon" },
  { value: "Ripstop Polyester", label: "Ripstop Polyester" },
  { value: "Ryon", label: "Ryon" },
  { value: "Sateen", label: "Sateen" },
  { value: "Satin", label: "Satin" },
  { value: "Scuba knit", label: "Scuba Knit" },
  { value: "Seersucker", label: "Seersucker" },
  { value: "Sequin Embellished Fabric", label: "Sequin Embellished Fabric" },
  { value: "Sequined Fabrics", label: "Sequined Fabrics" },
  { value: "Sheer Fabrics", label: "Sheer Fabrics" },
  { value: "Sherpa Fleece", label: "Sherpa Fleece" },
  { value: "Shibori fabrics", label: "Shibori Fabrics" },
  { value: "Silk", label: "Silk" },
  { value: "Silk blends", label: "Silk Blends" },
  { value: "Silk spandex blends", label: "Silk Spandex Blends" },
  { value: "Sisal", label: "Sisal" },
  { value: "Slim Fit Fabric", label: "Slim Fit Fabric" },
  { value: "Slinky Knit", label: "Slinky Knit" },
  { value: "Slit Hem Fabric", label: "Slit Hem Fabric" },
  { value: "Slub Cotton", label: "Slub Cotton" },
  { value: "Slub Knit Fabric", label: "Slub Knit Fabric" },
  { value: "Soft plastics", label: "Soft Plastics" },
  { value: "Soy blend", label: "Soy Blend" },
  { value: "Soy jersey", label: "Soy Jersey" },
  { value: "Spandex", label: "Spandex" },
  { value: "Spandex Blend", label: "Spandex Blend" },
  { value: "Spandex Blends", label: "Spandex Blends" },
  { value: "Spandex Fabric", label: "Spandex Fabric" },
  { value: "Spotted Fabrics", label: "Spotted Fabrics" },
  { value: "Spun bamboo", label: "Spun Bamboo" },
  { value: "Spun Polyester", label: "Spun Polyester" },
  { value: "Spun Silk", label: "Spun Silk" },
  { value: "Stretch Fabric", label: "Stretch Fabric" },
  { value: "Suede", label: "Suede" },
  { value: "Suede Cloth", label: "Suede Cloth" },
  { value: "Supima Cotton", label: "Supima Cotton" },
  { value: "Supima Cotton Fabric", label: "Supima Cotton Fabric" },
  { value: "Tail Hem Fabric", label: "Tail Hem Fabric" },
  { value: "Tartan", label: "Tartan" },
  { value: "Tencel", label: "Tencel" },
  { value: "Tencel blend", label: "Tencel Blend" },
  { value: "Tencel jersey", label: "Tencel Jersey" },
  { value: "Terry Cloth", label: "Terry Cloth" },
  { value: "Thermal Fabric", label: "Thermal Fabric" },
  { value: "Thermal Knit", label: "Thermal Knit" },
  { value: "Tie Front Fabric", label: "Tie Front Fabric" },
  { value: "Tie-dye Fabric", label: "Tie-Dye Fabric" },
  { value: "Tie-dye Fabrics", label: "Tie-Dye Fabrics" },
  { value: "Toweling", label: "Toweling" },
  { value: "Triacetate", label: "Triacetate" },
  { value: "Tri-Blend", label: "Tri-Blend" },
  { value: "Tulle", label: "Tulle" },
  { value: "Tweed", label: "Tweed" },
  { value: "Twill", label: "Twill" },
  { value: "Twist Front Fabric", label: "Twist Front Fabric" },
  { value: "UV Protection Fabric", label: "UV Protection Fabric" },
  { value: "Velcro", label: "Velcro" },
  { value: "Velour", label: "Velour" },
  { value: "Velvet", label: "Velvet" },
  { value: "Velveteen", label: "Velveteen" },
  { value: "Vintage Washed", label: "Vintage Washed" },
  { value: "Viscco", label: "Viscco" },
  { value: "Viscose", label: "Viscose" },
  { value: "Viscose jersey", label: "Viscose Jersey" },
  { value: "Voile", label: "Voile" },
  { value: "Waffle Knit", label: "Waffle Knit" },
  { value: "Waffle Knit Fabric", label: "Waffle Knit Fabric" },
  { value: "Wool", label: "Wool" },
  { value: "wool blends", label: "Wool Blends" },
  { value: "Wool/Spandex", label: "Wool/Spandex" },
  { value: "Wrap Front Fabric", label: "Wrap Front Fabric" },
  { value: "Yarn-dyed fabrics", label: "Yarn-Dyed Fabrics" },
  { value: "Zip Front Fabric", label: "Zip Front Fabric" },
];

function NewOrder() {
  const [orderNumber, setOrderNumber] = useState("");
  const navigate = useNavigate();
  const [numberOfUnits, setNumberOfUnits] = useState("");
  const [endUse, setEndUse] = useState("");
  const [fabricMethod, setFabricMethod] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [fiberContent, setFiberContent] = useState([""]);
  const OrderRef = ref(projectFirestore, "/Orders");

  const handleFabricMethodChange = (event) => {
    setFabricMethod(event.target.value);

    if (event.target.value === "SINGLE_BLEND") {
      setFiberContent([""]);
    } else if (event.target.value === "TWO_FABRIC_BLEND") {
      setFiberContent(["", ""]);
    } else if (event.target.value === "TRI_BLEND") {
      setFiberContent(["", "", ""]);
    }
  };

  const handleFiberContentChange = (index, value) => {
    const updatedFiberContent = [...fiberContent];
    updatedFiberContent[index] = value;
    setFiberContent(updatedFiberContent);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add a new foot to the Firestore collection
      const newOrderRef = push(OrderRef, {
        OrderNumber: orderNumber,
        StartDate: startDate,
        EndDate: endDate,
        NumberOfUnits: numberOfUnits,
        EndUse: endUse,
        FabricMethod: fabricMethod,
        FiberContent: fiberContent,
      });

      alert("New Order Created Successfully!", newOrderRef); // Set the success message
      navigate(`/order`);
    } catch (error) {
      // Handle the error (you can show an error message to the user)
      console.error("Error Creating new Order:", error.message);
    }
  };

  return (
    <PageMain>
      <Typography variant="h4" gutterBottom>
        Create New Order
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ marginBottom: "20px" }}>
          <TextField
            label="Order Number"
            fullWidth
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            required
          />
        </Box>
        <Box sx={{ marginBottom: "20px" }}>
          <TextField
            label="Start Date"
            type="date"
            fullWidth
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </Box>
        <Box sx={{ marginBottom: "20px" }}>
          <TextField
            label="End Date"
            type="date"
            fullWidth
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </Box>

        <Box sx={{ marginBottom: "20px" }}>
          <TextField
            label="Number of Units"
            fullWidth
            value={numberOfUnits}
            onChange={(e) => setNumberOfUnits(e.target.value)}
            type="number"
            required
          />
        </Box>

        <Box sx={{ marginBottom: "20px" }}>
          <TextField
            select
            label="End Use"
            fullWidth
            value={endUse}
            onChange={(e) => setEndUse(e.target.value)}
            required
            // Limit the dropdown menu size
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  style: {
                    maxHeight: 200, // Max height for dropdown menu
                    width: 250, // Width for dropdown menu
                  },
                },
              },
            }}
          >
            {enduseOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Box sx={{ marginBottom: "20px" }}>
          <TextField
            select
            label="Fabric Method"
            fullWidth
            value={fabricMethod}
            onChange={handleFabricMethodChange}
            required
            // Limit the dropdown menu size
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  style: {
                    maxHeight: 200, // Max height for dropdown menu
                    width: 250, // Width for dropdown menu
                  },
                },
              },
            }}
          >
            {fabricMethodOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        {/* Render fiber content fields based on the selected fabric method */}
        {fabricMethod &&
          fiberContent.map((fiber, index) => (
            <Box sx={{ marginBottom: "20px" }} key={index}>
              <TextField
                select
                label={`Fiber Content ${index + 1}`}
                fullWidth
                value={fiber}
                onChange={(e) =>
                  handleFiberContentChange(index, e.target.value)
                }
                required
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      style: {
                        maxHeight: 200, // Max height for dropdown menu
                        width: 250, // Width for dropdown menu
                      },
                    },
                  },
                }}
              >
                {fabricOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          ))}

        <Button type="submit" variant="contained" color="primary">
          Create Order
        </Button>
      </form>
      <Box
        component={Link} // Make the Box a Link component
        to="/order"
        sx={{ width: "100%", alignItems: "center" }}
      >
        <Button
          variant="contained"
          color="warning"
          style={{ width: "20%", margin: "1%", marginLeft: "40%" }}
        >
          Home Page
        </Button>
      </Box>
    </PageMain>
  );
}

export default NewOrder;
