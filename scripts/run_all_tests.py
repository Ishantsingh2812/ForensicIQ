#!/usr/bin/env python3
"""
ForensicIQ Unified Automated Test Runner for all 48 Test Cases.

Executes:
  - Phase 1 (Python / AI Microservice): TC-01 to TC-36 via Pytest
  - Phase 2 (Spring Boot Core Backend): TC-37 to TC-42 via JUnit 5 / Maven
  - Phase 3 (Frontend React / Vitest):  TC-43 to TC-48 via Vitest

Outputs a standardized PASS/FAIL/BLOCKED scorecard for all 48 test cases.
"""

import json
import os
import re
import subprocess
import sys
import time
from pathlib import Path

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

ROOT_DIR = Path(__file__).resolve().parent.parent
FIXTURE_PATH = ROOT_DIR / "tests" / "fixtures" / "test_cases_48.json"

def load_test_cases():
    with open(FIXTURE_PATH, "r", encoding="utf-8") as f:
        return json.load(f)

def run_pytest():
    print("\n" + "=" * 80)
    print("[PHASE 1] Running Python Pytest Suite (TC-01 to TC-36)...")
    print("=" * 80)
    cmd = [sys.executable, "-m", "pytest", "ai-service/tests/test_48_test_cases.py", "-v"]
    result = subprocess.run(cmd, cwd=str(ROOT_DIR), capture_output=True, text=True, encoding="utf-8", errors="replace")
    print(result.stdout)
    if result.stderr:
        print(result.stderr, file=sys.stderr)
    return result

def run_maven():
    print("\n" + "=" * 80)
    print("[PHASE 2] Running Spring Boot JUnit 5 Suite (TC-37 to TC-42)...")
    print("=" * 80)
    mvn_cmd = "mvn.cmd" if os.name == "nt" else "mvn"
    cmd = [mvn_cmd, "-f", "backend/pom.xml", "test", "-Dtest=ForensicAiTests48"]
    result = subprocess.run(cmd, cwd=str(ROOT_DIR), capture_output=True, text=True, encoding="utf-8", errors="replace")
    print(result.stdout)
    if result.stderr:
        print(result.stderr, file=sys.stderr)
    return result

def run_vitest():
    print("\n" + "=" * 80)
    print("[PHASE 3] Running Frontend React Vitest Suite (TC-43 to TC-48)...")
    print("=" * 80)
    npm_cmd = "npm.cmd" if os.name == "nt" else "npm"
    cmd = [npm_cmd, "--prefix", "frontend", "test", "--", "--run", "src/tests/ForensicAiTests48.test.tsx"]
    result = subprocess.run(cmd, cwd=str(ROOT_DIR), capture_output=True, text=True, encoding="utf-8", errors="replace")
    print(result.stdout)
    if result.stderr:
        print(result.stderr, file=sys.stderr)
    return result

def parse_pytest_results(stdout, test_cases):
    results = {}
    for tc in test_cases[:36]:
        tc_id = tc["id"]
        # Look for e.g. test_case_01[TC-01] PASSED or test_48_test_cases.py::...[TC-01... PASSED
        pattern = rf"{re.escape(tc_id)}.*?PASSED"
        fail_pattern = rf"{re.escape(tc_id)}.*?FAILED"
        if re.search(pattern, stdout):
            results[tc_id] = ("PASS", "Verified statutory elements, sections, and confidence decoupling")
        elif re.search(fail_pattern, stdout):
            results[tc_id] = ("FAIL", "Assertion mismatch in statutory extraction/confidence")
        else:
            results[tc_id] = ("BLOCKED", "Test not executed or environment failure")
    return results

def parse_maven_results(stdout, test_cases):
    results = {}
    backend_map = {
        "TC-37": "tc37_analyzeValidPayloadReturns200AndContract",
        "TC-38": "tc38_blankScenarioReturns400",
        "TC-39": "tc39_unauthenticatedAccessToCasesReturns401Or403",
        "TC-40": "tc40_studentBlockedFromAdminAuditReturns403",
        "TC-41": "tc41_validJpegUploadReturnsSuccess",
        "TC-42": "tc42_invalidExecutableUploadReturns400",
    }
    has_build_success = "BUILD SUCCESS" in stdout
    for tc in test_cases[36:42]:
        tc_id = tc["id"]
        method_name = backend_map.get(tc_id, "")
        if f"{method_name} <<< FAILURE!" in stdout or f"{method_name} <<< ERROR!" in stdout:
            results[tc_id] = ("FAIL", "Assertion failed or error returned")
        elif has_build_success:
            results[tc_id] = ("PASS", "HTTP contract, validation, and RBAC verified")
        else:
            results[tc_id] = ("BLOCKED", "Maven build did not complete successfully")
    return results

def parse_vitest_results(stdout, test_cases):
    results = {}
    frontend_tcs = [tc["id"] for tc in test_cases[42:48]]
    for tc_id in frontend_tcs:
        pattern = rf"✓.*{re.escape(tc_id)}"
        fail_pattern = rf"×.*{re.escape(tc_id)}"
        if re.search(pattern, stdout):
            results[tc_id] = ("PASS", "DOM rendering, interaction, security link, and persistence verified")
        elif re.search(fail_pattern, stdout):
            results[tc_id] = ("FAIL", "UI assertion failed")
        elif "Tests  6 passed (6)" in stdout or "6 passed" in stdout:
            results[tc_id] = ("PASS", "DOM rendering, interaction, security link, and persistence verified")
        else:
            results[tc_id] = ("BLOCKED", "Vitest suite did not complete")
    return results

def main():
    start_time = time.time()
    test_cases = load_test_cases()
    print(f"Loaded {len(test_cases)} authoritative test cases from {FIXTURE_PATH}")

    # Phase 1: Pytest (TC-01 to TC-36)
    pytest_res = run_pytest()
    py_results = parse_pytest_results(pytest_res.stdout, test_cases)

    # Phase 2: Maven (TC-37 to TC-42)
    mvn_res = run_maven()
    mvn_results = parse_maven_results(mvn_res.stdout, test_cases)

    # Phase 3: Vitest (TC-43 to TC-48)
    vitest_res = run_vitest()
    vitest_results = parse_vitest_results(vitest_res.stdout, test_cases)

    # Merge all results
    all_results = {**py_results, **mvn_results, **vitest_results}

    print("\n" + "=" * 100)
    print("FORENSICAI AUTOMATED TEST SUITE: DEFINITIVE 48 TEST CASES SCORECARD")
    print("=" * 100)
    print(f"{'ID':<7} | {'Category':<24} | {'Status':<7} | {'Test Name & Details'}")
    print("-" * 100)

    pass_count = 0
    fail_count = 0
    blocked_count = 0

    for tc in test_cases:
        tc_id = tc["id"]
        status, detail = all_results.get(tc_id, ("BLOCKED", "Not evaluated"))
        if status == "PASS":
            pass_count += 1
            color_prefix = "[PASS]"
        elif status == "FAIL":
            fail_count += 1
            color_prefix = "[FAIL]"
        else:
            blocked_count += 1
            color_prefix = "[BLOCKED]"

        name_display = tc['name'][:42] + ("..." if len(tc['name']) > 42 else "")
        print(f"{tc_id:<7} | {tc['category']:<24} | {color_prefix:<9} | {name_display} ({detail})")

    duration = time.time() - start_time
    print("-" * 100)
    print(f"FINAL TEST SUMMARY: {pass_count} PASSED, {fail_count} FAILED, {blocked_count} BLOCKED (Total: {len(test_cases)}) in {duration:.2f}s")
    print("=" * 100)

    # Exit code
    if fail_count > 0 or blocked_count > 0:
        sys.exit(1)
    else:
        print("\nAll 48 test cases verified successfully across AI Microservice, Core Backend, and Frontend UI.")
        sys.exit(0)

if __name__ == "__main__":
    main()
