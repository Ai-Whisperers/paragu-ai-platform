"""
RUN 2 — México + Argentina + España: content creativo, creative director, brand manager editorial
Estrategia: ampliar más allá de "diseño" puro — capturar roles de contenido creativo, estrategia de marca,
dirección creativa en empresas con foco cultural/editorial. Mexico y Argentina como mercados secundarios.
"""
import sys
sys.stdout.reconfigure(encoding="utf-8")

from jobspy import scrape_jobs
import pandas as pd
from datetime import datetime

pd.set_option("display.max_colwidth", 200)

GARBAGE_COMPANIES = [
    "Huzzle", "Traze", "Talent Harbor", "Talent Scout", "OnHires",
    "Brilliantin", "Tangent", "CyberCoders", "AspenView", "Somewhere",
    "Orange Storm", "Staffing", "staffing", "Outsourcing", "outsourcing",
    "Randstad", "ManpowerGroup", "Adecco", "Temporing", "Gi Group",
    "Michael Page", "PageGroup", "Robert Half", "Spring Professional",
]

WRONG_ROLES = [
    "Sales", "Ventas", "Account Manager", "Customer Success", "SDR",
    "Business Development", "Account Executive", "Comercial",
    "HR Manager", "Recursos Humanos", "Talent", "Recruiter",
    "Selección", "Reclutamiento",
    "Frontend", "Backend", "Mobile", "iOS", "Android", "DevOps",
    "Network Engineer", "Security", "QA Engineer", "Tester",
    "Desarrollador", "Programador", "Software Engineer", "Data Engineer",
    "Accountant", "Contador", "Contable", "Bookkeeper", "Finanzas",
    "Real Estate", "Inmobiliaria", "Abogado", "Legal",
]

SEARCHES = [
    # México — mercado editorial grande + plataformas digitales
    {"term": "diseño editorial remoto",              "country": "Mexico"},
    {"term": "marketing de contenidos editorial",    "country": "Mexico"},
    {"term": "coordinadora de contenidos creativo",  "country": "Mexico"},
    {"term": "diseñadora gráfica libros remoto",     "country": "Mexico"},
    {"term": "responsable de marca editorial",       "country": "Mexico"},
    # Argentina — fuerte ecosistema creativo digital
    {"term": "diseño editorial remoto",              "country": "Argentina"},
    {"term": "content manager editorial cultural",   "country": "Argentina"},
    {"term": "diseñadora portadas",                  "country": "Argentina"},
    # España — roles adyacentes creativos
    {"term": "responsable de contenidos remoto",     "country": "Spain"},
    {"term": "content creator editorial",            "country": "Spain"},
    {"term": "brand manager editorial cultural",     "country": "Spain"},
    {"term": "dirección creativa remoto",            "country": "Spain"},
]

all_jobs = []
yield_log = []

for s in SEARCHES:
    print(f"\nRUN2 | Indeed {s['country']} | '{s['term']}'")
    try:
        jobs = scrape_jobs(
            site_name      = ["indeed"],
            search_term    = s["term"],
            location       = "",
            results_wanted = 25,
            is_remote      = True,
            hours_old      = 720,
            country_indeed = s["country"],
        )
        n_raw = len(jobs)
        if n_raw > 0:
            jobs["search_term"]    = s["term"]
            jobs["search_country"] = s["country"]
            all_jobs.append(jobs)
        yield_log.append({"term": s["term"], "country": s["country"], "raw": n_raw})
        print(f"   Found: {n_raw}")
    except Exception as e:
        print(f"   Error: {e}")
        yield_log.append({"term": s["term"], "country": s["country"], "raw": 0, "error": str(e)})

if not all_jobs:
    print("No results.")
    sys.exit(0)

df = pd.concat(all_jobs, ignore_index=True)
n_pre_dedup = len(df)
df = df.drop_duplicates(subset=["job_url"], keep="first")
n_post_dedup = len(df)

for n in GARBAGE_COMPANIES:
    df = df[~df["company"].str.contains(n, na=False, case=False)]
for r in WRONG_ROLES:
    df = df[~df["title"].str.contains(r, na=False, case=False)]

n_post_filter = len(df)

cols = ["search_term","search_country","site","title","company","location","date_posted",
        "min_amount","max_amount","currency","job_url","description"]
cols = [c for c in cols if c in df.columns]
df = df[cols]
if "date_posted" in df.columns:
    df = df.sort_values("date_posted", ascending=False)

ts  = datetime.now().strftime("%Y-%m-%d-%H%M")
out = f"C:/Users/PREDATOR/Documents/MonaisLair/projects/personal/career-daihana/jobspy-results/run2-{ts}.csv"
df.to_csv(out, index=False, encoding="utf-8-sig")

desc_filled   = df["description"].notna().sum() if "description" in df.columns else 0
salary_filled = df["min_amount"].notna().sum()  if "min_amount"  in df.columns else 0

print(f"\n{'='*80}\nRUN2 YIELD SUMMARY\n{'='*80}")
print(f"Raw: {n_pre_dedup} | Dedup: {n_post_dedup} | Filtered: {n_post_filter}")
print(f"With descriptions: {desc_filled}/{n_post_filter}")
print(f"With salary data:  {salary_filled}/{n_post_filter}")
print(f"Output: {out}")

print(f"\n{'='*80}\nPER-SEARCH YIELD\n{'='*80}")
for y in yield_log:
    err = f" [ERR: {y.get('error','')[:60]}]" if "error" in y else ""
    print(f"  {y['country']:12} {y['raw']:4}  {y['term']}{err}")

scols = [c for c in ["search_country","title","company","location","date_posted","min_amount","max_amount"] if c in df.columns]
print(f"\n{'='*130}\nALL FILTERED RESULTS\n{'='*130}")
print(df[scols].to_string(index=False))

if "description" in df.columns:
    with_desc = df[df["description"].notna()]
    print(f"\n{'='*80}\nDESCRIPTIONS ({len(with_desc)} jobs)\n{'='*80}")
    for _, row in with_desc.iterrows():
        print(f"\n[{row.get('search_country','')}] {row['company']} — {row['title']}")
        print(f"URL: {row['job_url']}")
        if pd.notna(row.get("min_amount")):
            print(f"Salary: {row['min_amount']} – {row['max_amount']} {row.get('currency','')}")
        print(str(row["description"])[:2000])
        print("-"*80)
